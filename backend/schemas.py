"""Compatibility wrapper for backend schemas."""
from backend.app.schemas import (
    DocumentFileBase,
    DocumentFileCreate,
    DocumentFileResponse,
    AnalysisRiskBase,
    AnalysisRiskCreate,
    AnalysisRiskResponse,
    DocumentAnalysisBase,
    DocumentAnalysisCreate,
    DocumentAnalysisResponse,
    DocumentAnalysisDetailedResponse,
    DocumentWithAnalysisResponse,
    AnalysisListResponse,
    APIResponse,
    FileUploadResponse,
)

__all__ = [
    "DocumentFileBase",
    "DocumentFileCreate",
    "DocumentFileResponse",
    "AnalysisRiskBase",
    "AnalysisRiskCreate",
    "AnalysisRiskResponse",
    "DocumentAnalysisBase",
    "DocumentAnalysisCreate",
    "DocumentAnalysisResponse",
    "DocumentAnalysisDetailedResponse",
    "DocumentWithAnalysisResponse",
    "AnalysisListResponse",
    "APIResponse",
    "FileUploadResponse",
]
