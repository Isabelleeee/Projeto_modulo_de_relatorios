"""
Project Analysis API - Backend Application.

FastAPI backend for document analysis using Groq AI.
"""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from config import settings
from database import init_db
from routes import documents, health

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)


# Startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage app lifespan - startup and shutdown events.
    """
    # Startup
    logger.info("Starting application...")
    init_db()
    logger.info("Database initialized")
    yield
    # Shutdown
    logger.info("Shutting down application...")


# Create FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

# Include routers
app.include_router(health.router)
app.include_router(documents.router)

logger.info(f"Application initialized - API v{settings.API_VERSION}")


