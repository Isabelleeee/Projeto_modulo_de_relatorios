"""
Backend core configuration.
"""
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings and configuration."""

    # API Configuration
    API_TITLE: str = "Project Analysis API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "AI-powered project analysis using Groq LLaMA"

    # CORS Configuration
    CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://localhost:3000"
    ).split(",")
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]

    # File Upload Configuration
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".md"]

    # AI Configuration
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = "llama-3.1-8b-instant"
    AI_TEMPERATURE: float = 0.3
    AI_MAX_TOKENS: int = 2048

    # Logging Configuration
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    # Database Configuration (for future use)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./project_analysis.db"
    )

    # Security
    API_SECRET_KEY: str = os.getenv("API_SECRET_KEY", "your-secret-key-change-me")

    def __init__(self):
        """Initialize settings and validate required values."""
        if not self.GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY environment variable is required")

        # Create upload directory if it doesn't exist
        os.makedirs(self.UPLOAD_DIR, exist_ok=True)


settings = Settings()
