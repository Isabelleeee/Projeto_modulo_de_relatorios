"""Compatibility wrapper for backend models."""
from backend.app.models import DocumentFile, DocumentAnalysis, AnalysisRisk

__all__ = [
    "DocumentFile",
    "DocumentAnalysis",
    "AnalysisRisk",
]
