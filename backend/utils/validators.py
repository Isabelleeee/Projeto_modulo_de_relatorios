"""
File validation utilities.
"""
import os
from typing import Tuple
from fastapi import UploadFile
from config import settings
from .errors import InvalidFileFormatError, FileTooLargeError


def validate_file_upload(file: UploadFile) -> Tuple[str, str]:
    """
    Validate uploaded file format and extract type.
    
    Args:
        file: The uploaded file
        
    Returns:
        Tuple of (filename, file_type)
        
    Raises:
        InvalidFileFormatError: If file format is not allowed
    """
    if not file.filename:
        raise InvalidFileFormatError("unknown", settings.ALLOWED_EXTENSIONS)
    
    # Get file extension
    _, ext = os.path.splitext(file.filename)
    ext = ext.lower()
    
    if ext not in settings.ALLOWED_EXTENSIONS:
        raise InvalidFileFormatError(file.filename, settings.ALLOWED_EXTENSIONS)
    
    return file.filename, ext.lstrip(".")


def validate_file_size(file_size: int) -> None:
    """
    Validate file size against maximum allowed.
    
    Args:
        file_size: Size in bytes
        
    Raises:
        FileTooLargeError: If file exceeds maximum size
    """
    if file_size > settings.MAX_FILE_SIZE:
        raise FileTooLargeError(file_size, settings.MAX_FILE_SIZE)


def get_file_extension(filename: str) -> str:
    """
    Extract file extension from filename.
    
    Args:
        filename: The filename
        
    Returns:
        File extension without dot
    """
    _, ext = os.path.splitext(filename)
    return ext.lower().lstrip(".")
