"""
Services compatibility wrapper.
"""
from backend.app.services.groq_service import GroqService, get_groq_service
from backend.app.services.document_service import DocumentService
from backend.app.services.report_service import ReportService

__all__ = [
    "GroqService",
    "get_groq_service",
    "DocumentService",
    "ReportService",
]
