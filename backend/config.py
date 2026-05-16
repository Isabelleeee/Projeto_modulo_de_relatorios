"""Compatibility wrapper for backend configuration."""
try:
    from backend.core.config import settings
except ImportError:
    from core.config import settings

__all__ = ["settings"]
