"""
Document endpoints for uploading and managing files.
"""
import logging
import os
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Depends, Query, HTTPException
from starlette.background import BackgroundTask
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import DocumentFile, DocumentAnalysis, AnalysisRisk
from backend.schemas import (
    DocumentFileResponse,
    FileUploadResponse,
    DocumentAnalysisResponse,
    DocumentWithAnalysisResponse,
    AnalysisListResponse,
)
from backend.services import DocumentService, get_groq_service, ReportService
from backend.utils import DocumentNotFoundError, AnalysisNotFoundError

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/documents", tags=["documents"])


@router.post("/upload", response_model=FileUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload a document for analysis.
    
    - **file**: PDF or Markdown file to analyze
    
    Returns file ID and metadata for tracking.
    """
    try:
        logger.info(f"Processing upload: {file.filename}")
        
        # Save file
        filename, file_type, file_size = await DocumentService.save_uploaded_file(file)
        
        # Store in database
        file_path = f"uploads/{filename}"
        db_file = DocumentFile(
            filename=filename,
            file_size=file_size,
            file_type=file_type,
            upload_path=file_path
        )
        db.add(db_file)
        db.commit()
        db.refresh(db_file)
        
        logger.info(f"File stored in database: ID={db_file.id}")
        
        return FileUploadResponse(
            success=True,
            message="File uploaded successfully",
            file_id=db_file.id,
            filename=filename,
            file_size=file_size
        )
    
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        db.rollback()
        raise


@router.post("/analyze/{file_id}", response_model=DocumentAnalysisResponse)
async def analyze_document(
    file_id: int,
    db: Session = Depends(get_db)
):
    """
    Analyze a previously uploaded document.
    
    Uses Groq AI to generate technical analysis and identify risks.
    """
    try:
        # Get document from database
        doc = db.query(DocumentFile).filter(DocumentFile.id == file_id).first()
        if not doc:
            raise DocumentNotFoundError(file_id)
        
        logger.info(f"Analyzing document: {doc.filename}")
        
        # Extract text from file
        file_path = doc.upload_path
        text = DocumentService.extract_text(file_path, doc.file_type)
        
        # Get AI service
        groq_service = get_groq_service()
        
        # Analyze with AI
        start_time = datetime.utcnow()
        summary, risks, duration = groq_service.analyze_project_document(text)
        
        # Store analysis in database
        analysis = DocumentAnalysis(
            document_id=file_id,
            summary=summary,
            analyzed_at=datetime.utcnow(),
            analysis_duration=duration,
            status="completed"
        )
        db.add(analysis)
        db.flush()  # Get the analysis ID
        
        # Store risks
        for risk_desc in risks:
            risk = AnalysisRisk(
                analysis_id=analysis.id,
                description=risk_desc,
                severity="medium",
                category="technical"
            )
            db.add(risk)
        
        db.commit()
        db.refresh(analysis)
        
        logger.info(f"Analysis completed: {len(risks)} risks identified")
        
        return DocumentAnalysisResponse(
            id=analysis.id,
            document_id=analysis.document_id,
            summary=analysis.summary,
            analyzed_at=analysis.analyzed_at,
            status=analysis.status,
            risks=[
                {"id": r.id, "analysis_id": r.analysis_id, "description": r.description,
                 "severity": r.severity, "category": r.category, "mitigation": r.mitigation,
                 "identified_at": r.identified_at}
                for r in analysis.risks
            ]
        )
    
    except DocumentNotFoundError:
        raise
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        db.rollback()
        raise


@router.get("/{file_id}/download/{report_format}")
async def download_report(
    file_id: int,
    report_format: str,
    db: Session = Depends(get_db)
):
    """Download the generated report for a specific document."""
    document = db.query(DocumentFile).filter(DocumentFile.id == file_id).first()
    if not document:
        raise DocumentNotFoundError(file_id)

    analysis = (
        db.query(DocumentAnalysis)
        .filter(DocumentAnalysis.document_id == file_id)
        .order_by(DocumentAnalysis.analyzed_at.desc())
        .first()
    )

    if not analysis:
        raise AnalysisNotFoundError(file_id)

    report_format = report_format.lower()
    if report_format not in {"markdown", "pdf", "docx"}:
        raise HTTPException(status_code=400, detail="Invalid report format")

    report_path = ReportService.create_report_file(document, analysis, report_format)
    media_types = {
        "markdown": "text/markdown",
        "pdf": "application/pdf",
        "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    return FileResponse(
        path=report_path,
        filename=f"relatorio_{document.id}.{report_format}",
        media_type=media_types[report_format],
        background=BackgroundTask(lambda: os.remove(report_path))
    )


@router.get("/{file_id}", response_model=DocumentWithAnalysisResponse)
async def get_document(
    file_id: int,
    db: Session = Depends(get_db)
):
    """
    Get document details with its latest analysis.
    """
    doc = db.query(DocumentFile).filter(DocumentFile.id == file_id).first()
    if not doc:
        raise DocumentNotFoundError(file_id)
    
    # Get latest analysis
    latest_analysis = (
        db.query(DocumentAnalysis)
        .filter(DocumentAnalysis.document_id == file_id)
        .order_by(DocumentAnalysis.analyzed_at.desc())
        .first()
    )
    
    return DocumentWithAnalysisResponse(
        id=doc.id,
        filename=doc.filename,
        file_size=doc.file_size,
        file_type=doc.file_type,
        uploaded_at=doc.uploaded_at,
        latest_analysis=latest_analysis
    )


@router.get("", response_model=AnalysisListResponse)
async def list_documents(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    List all documents with pagination.
    """
    skip = (page - 1) * page_size
    
    total = db.query(DocumentFile).count()
    documents = (
        db.query(DocumentFile)
        .offset(skip)
        .limit(page_size)
        .all()
    )
    
    return AnalysisListResponse(
        total=total,
        page=page,
        page_size=page_size,
        items=[
            DocumentAnalysisResponse(
                id=doc.id,
                document_id=doc.id,
                summary=f"Uploaded: {doc.filename}",
                analyzed_at=doc.uploaded_at,
                status="pending"
            )
            for doc in documents
        ]
    )


@router.delete("/{file_id}")
async def delete_document(
    file_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a document and its analyses.
    """
    doc = db.query(DocumentFile).filter(DocumentFile.id == file_id).first()
    if not doc:
        raise DocumentNotFoundError(file_id)
    
    try:
        # Delete file from disk
        DocumentService.cleanup_temp_file(doc.upload_path)
        
        # Delete from database (cascades to analyses and risks)
        db.delete(doc)
        db.commit()
        
        return {"success": True, "message": f"Document {file_id} deleted"}
    
    except Exception as e:
        logger.error(f"Delete error: {str(e)}")
        db.rollback()
        raise
