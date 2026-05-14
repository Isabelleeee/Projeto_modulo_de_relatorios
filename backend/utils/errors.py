"""
Custom exception classes for the application.
"""
from fastapi import HTTPException, status


class DocumentNotFoundError(HTTPException):
    """Raised when a document is not found."""
    def __init__(self, document_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with ID {document_id} not found"
        )


class AnalysisNotFoundError(HTTPException):
    """Raised when an analysis is not found."""
    def __init__(self, analysis_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis with ID {analysis_id} not found"
        )


class InvalidFileFormatError(HTTPException):
    """Raised when file format is invalid."""
    def __init__(self, filename: str, allowed_formats: list):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file format '{filename}'. Allowed: {', '.join(allowed_formats)}"
        )


class FileTooLargeError(HTTPException):
    """Raised when file exceeds size limit."""
    def __init__(self, file_size: int, max_size: int):
        super().__init__(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size {file_size} bytes exceeds maximum {max_size} bytes"
        )


class FileUploadError(HTTPException):
    """Raised when file upload fails."""
    def __init__(self, error_message: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File upload failed: {error_message}"
        )


class AnalysisProcessingError(HTTPException):
    """Raised when AI analysis fails."""
    def __init__(self, error_message: str):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis processing failed: {error_message}"
        )


class AIServiceError(HTTPException):
    """Raised when AI service is unavailable."""
    def __init__(self, service_name: str = "Groq"):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI service ({service_name}) is currently unavailable. Please try again later."
        )


class DatabaseError(HTTPException):
    """Raised when database operation fails."""
    def __init__(self, error_message: str = "Database operation failed"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {error_message}"
        )
