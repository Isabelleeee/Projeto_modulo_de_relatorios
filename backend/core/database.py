"""
Backend core database configuration.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import StaticPool
from .config import settings

# Database URL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./project_analysis.db"
)

# SQLite-specific configuration
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        echo=os.getenv("LOG_LEVEL") == "DEBUG"
    )
else:
    # PostgreSQL or other databases
    engine = create_engine(
        DATABASE_URL,
        echo=os.getenv("LOG_LEVEL") == "DEBUG"
    )

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all models
Base = declarative_base()


def get_db():
    """
    Dependency injection for database session.
    Used in FastAPI endpoints.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    Initialize database tables.
    Call this once at application startup.
    """
    Base.metadata.create_all(bind=engine)


def drop_db():
    """
    Drop all database tables.
    Use with caution - only for testing/reset.
    """
    Base.metadata.drop_all(bind=engine)
