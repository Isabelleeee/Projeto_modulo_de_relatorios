"""
Document processing service.
"""
import logging
import os
import tempfile
from typing import Tuple
from fastapi import UploadFile
from pypdf import PdfReader
from config import settings
from utils.errors import FileUploadError
from utils.validators import validate_file_upload, validate_file_size, get_file_extension

logger = logging.getLogger(__name__)


class DocumentService:
    """
    Service for handling document uploads and processing.
    """
    
    @staticmethod
    async def save_uploaded_file(file: UploadFile) -> Tuple[str, str, int]:
        """
        Save uploaded file to disk.
        
        Args:
            file: The uploaded file
            
        Returns:
            Tuple of (filename, file_type, file_size)
            
        Raises:
            FileUploadError: If save fails
        """
        try:
            # Validate file format
            filename, file_type = validate_file_upload(file)
            
            # Read file content
            content = await file.read()
            file_size = len(content)
            
            # Validate file size
            validate_file_size(file_size)
            
            # Create upload directory if needed
            os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
            
            # Save file
            file_path = os.path.join(settings.UPLOAD_DIR, filename)
            with open(file_path, "wb") as buffer:
                buffer.write(content)
            
            logger.info(f"File saved: {file_path} ({file_size} bytes)")
            return filename, file_type, file_size
            
        except Exception as e:
            logger.error(f"File upload error: {str(e)}")
            raise FileUploadError(str(e))
    
    @staticmethod
    def extract_text_from_pdf(file_path: str, max_chars: int = None) -> str:
        """
        Extract text from PDF file.
        
        Args:
            file_path: Path to PDF file
            max_chars: Maximum characters to extract
            
        Returns:
            Extracted text
            
        Raises:
            FileUploadError: If extraction fails
        """
        try:
            logger.info(f"Extracting text from PDF: {file_path}")
            reader = PdfReader(file_path)
            
            text = " ".join([
                str(page.extract_text() or "")
                for page in reader.pages
            ])
            
            if max_chars:
                text = text[:max_chars]
            
            logger.info(f"Extracted {len(text)} characters")
            return text
            
        except Exception as e:
            logger.error(f"PDF extraction error: {str(e)}")
            raise FileUploadError(f"Failed to extract PDF text: {str(e)}")
    
    @staticmethod
    def extract_text_from_markdown(file_path: str, max_chars: int = None) -> str:
        """
        Extract text from Markdown file.
        
        Args:
            file_path: Path to Markdown file
            max_chars: Maximum characters to extract
            
        Returns:
            Extracted text
            
        Raises:
            FileUploadError: If extraction fails
        """
        try:
            logger.info(f"Extracting text from Markdown: {file_path}")
            
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()
            
            if max_chars:
                text = text[:max_chars]
            
            logger.info(f"Extracted {len(text)} characters")
            return text
            
        except Exception as e:
            logger.error(f"Markdown extraction error: {str(e)}")
            raise FileUploadError(f"Failed to extract Markdown text: {str(e)}")
    
    @staticmethod
    def extract_text(file_path: str, file_type: str, max_chars: int = None) -> str:
        """
        Extract text from file based on type.
        
        Args:
            file_path: Path to file
            file_type: Type of file (pdf, md, txt)
            max_chars: Maximum characters to extract
            
        Returns:
            Extracted text
        """
        if file_type == "pdf":
            return DocumentService.extract_text_from_pdf(file_path, max_chars)
        elif file_type in ["md", "markdown"]:
            return DocumentService.extract_text_from_markdown(file_path, max_chars)
        else:
            # Default to text
            return DocumentService.extract_text_from_markdown(file_path, max_chars)
    
    @staticmethod
    def cleanup_temp_file(file_path: str) -> None:
        """
        Clean up temporary file.
        
        Args:
            file_path: Path to file to delete
        """
        try:
            if os.path.exists(file_path) and os.path.isfile(file_path):
                os.remove(file_path)
                logger.info(f"Cleaned up temporary file: {file_path}")
        except Exception as e:
            logger.warning(f"Failed to cleanup file {file_path}: {str(e)}")
    
    @staticmethod
    def get_file_info(file_path: str) -> dict:
        """
        Get information about a file.
        
        Args:
            file_path: Path to file
            
        Returns:
            Dictionary with file info
        """
        try:
            stat = os.stat(file_path)
            return {
                "size": stat.st_size,
                "created": stat.st_ctime,
                "modified": stat.st_mtime,
            }
        except Exception as e:
            logger.error(f"Error getting file info: {str(e)}")
            return {}
