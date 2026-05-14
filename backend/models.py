"""
SQLAlchemy ORM models for the database.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base


class DocumentFile(Base):
    """
    Represents an uploaded document file.
    """
    __tablename__ = "document_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), unique=True, index=True, nullable=False)
    file_size = Column(Integer, nullable=False)  # in bytes
    file_type = Column(String(10), nullable=False)  # pdf, md, etc
    upload_path = Column(String(512), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationship
    analyses = relationship("DocumentAnalysis", back_populates="document", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<DocumentFile(id={self.id}, filename={self.filename})>"


class DocumentAnalysis(Base):
    """
    Represents an AI analysis of a document.
    """
    __tablename__ = "document_analyses"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("document_files.id"), nullable=False, index=True)
    
    # Analysis content
    summary = Column(Text, nullable=False)
    full_analysis = Column(Text, nullable=True)
    
    # Metadata
    analyzed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    analysis_duration = Column(Float, nullable=True)  # in seconds
    
    # Status tracking
    status = Column(String(20), default="completed", nullable=False)  # pending, completed, failed
    error_message = Column(Text, nullable=True)
    
    # Model information
    ai_model = Column(String(100), default="llama-3.1-8b-instant", nullable=False)
    
    # Relationships
    document = relationship("DocumentFile", back_populates="analyses")
    risks = relationship("AnalysisRisk", back_populates="analysis", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<DocumentAnalysis(id={self.id}, document_id={self.document_id}, status={self.status})>"


class AnalysisRisk(Base):
    """
    Represents a risk identified in the analysis.
    """
    __tablename__ = "analysis_risks"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("document_analyses.id"), nullable=False, index=True)
    
    # Risk information
    description = Column(Text, nullable=False)
    severity = Column(String(20), nullable=True)  # low, medium, high, critical
    category = Column(String(100), nullable=True)  # timeline, technical, resource, etc
    
    # Additional details
    mitigation = Column(Text, nullable=True)
    identified_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationship
    analysis = relationship("DocumentAnalysis", back_populates="risks")

    def __repr__(self):
        return f"<AnalysisRisk(id={self.id}, analysis_id={self.analysis_id}, severity={self.severity})>"
