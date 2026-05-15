"""
Health check and status endpoints.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check():
    """
    Basic health check endpoint.
    """
    return {
        "status": "ok",
        "message": "Backend service is running"
    }


@router.get("/health/live")
def liveness_check():
    """
    Liveness probe for container orchestration.
    """
    return {
        "status": "alive",
        "message": "Service process is up"
    }


@router.get("/health/ready")
def readiness_check(db: Session = Depends(get_db)):
    """
    Readiness probe to verify database connectivity.
    """
    try:
        db.execute("SELECT 1")
        return {
            "status": "ready",
            "message": "Service is ready to receive traffic"
        }
    except Exception as e:
        return {
            "status": "not ready",
            "message": f"Database connection failure: {str(e)}"
        }


@router.get("/health/db")
def health_check_db(db: Session = Depends(get_db)):
    """
    Database connectivity check.
    """
    try:
        # Simple query to test database connection
        db.execute("SELECT 1")
        return {
            "status": "ok",
            "message": "Database is connected",
            "database": "SQLite"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Database error: {str(e)}"
        }


@router.get("/api/status")
def api_status(db: Session = Depends(get_db)):
    """
    Detailed API status information.
    """
    try:
        db.execute("SELECT 1")
        db_status = "connected"
    except:
        db_status = "disconnected"
    
    return {
        "api_version": "1.0.0",
        "status": "ok",
        "database": db_status,
        "services": {
            "groq_ai": "configured",
            "file_upload": "ready"
        }
    }
