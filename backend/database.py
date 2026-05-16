"""Compatibility wrapper for backend database configuration."""
try:
    from backend.core.database import SessionLocal, engine, Base, get_db, init_db, drop_db
except ImportError:
    from core.database import SessionLocal, engine, Base, get_db, init_db, drop_db

__all__ = [
    "SessionLocal",
    "engine",
    "Base",
    "get_db",
    "init_db",
    "drop_db",
]
