"""
Pydantic schemas for request/response validation.
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


# ============================================================
# DocumentFile Schemas
# ============================================================

class DocumentFileBase(BaseModel):
    """Base schema for document file."""
    filename: str = Field(..., min_length=1, max_length=255)
    file_type: str = Field(..., pattern=r"^(pdf|md|txt)$")


class DocumentFileCreate(DocumentFileBase):
    """Schema for creating a document file."""
    file_size: int = Field(..., gt=0)
    upload_path: str


class DocumentFileResponse(DocumentFileBase):
    """Schema for document file response."""
    id: int
    file_size: int
    uploaded_at: datetime

    class Config:
        from_attributes = True


# ============================================================
# AnalysisRisk Schemas
# ============================================================

class AnalysisRiskBase(BaseModel):
    """Base schema for analysis risk."""
    description: str = Field(..., min_length=10)
    severity: Optional[str] = Field(None, pattern=r"^(low|medium|high|critical)$")
    category: Optional[str] = None
    mitigation: Optional[str] = None


class AnalysisRiskCreate(AnalysisRiskBase):
    """Schema for creating a risk."""
    pass


class AnalysisRiskResponse(AnalysisRiskBase):
    """Schema for risk response."""
    id: int
    analysis_id: int
    identified_at: datetime

    class Config:
        from_attributes = True


# ============================================================
# DocumentAnalysis Schemas
# ============================================================

class DocumentAnalysisBase(BaseModel):
    """Base schema for document analysis."""
    summary: str = Field(..., min_length=10)
    ai_model: str = "llama-3.1-8b-instant"


class DocumentAnalysisCreate(DocumentAnalysisBase):
    """Schema for creating an analysis."""
    full_analysis: Optional[str] = None
    status: str = "completed"


class DocumentAnalysisResponse(DocumentAnalysisBase):
    """Schema for analysis response with risks."""
    id: int
    document_id: int
    analyzed_at: datetime
    status: str
    risks: List[AnalysisRiskResponse] = []
    error_message: Optional[str] = None

    class Config:
        from_attributes = True


class DocumentAnalysisDetailedResponse(DocumentAnalysisResponse):
    """Detailed analysis response with full analysis text."""
    full_analysis: Optional[str] = None


# ============================================================
# Combined Response Schemas
# ============================================================

class DocumentWithAnalysisResponse(DocumentFileResponse):
    """Document file with its latest analysis."""
    latest_analysis: Optional[DocumentAnalysisResponse] = None


class AnalysisListResponse(BaseModel):
    """List of analyses with pagination info."""
    total: int
    page: int
    page_size: int
    items: List[DocumentAnalysisResponse]


# ============================================================
# API Response Wrapper
# ============================================================

class APIResponse(BaseModel):
    """Standard API response wrapper."""
    success: bool
    message: str
    data: Optional[dict] = None
    error: Optional[str] = None


class FileUploadResponse(BaseModel):
    """Response for file upload."""
    success: bool
    message: str
    file_id: int
    filename: str
    file_size: int
