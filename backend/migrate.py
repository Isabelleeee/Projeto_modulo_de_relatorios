"""
Database migrations and setup utilities.
"""
import logging
from sqlalchemy import text
from backend.database import SessionLocal, engine, Base
from backend.models import DocumentFile, DocumentAnalysis, AnalysisRisk

logger = logging.getLogger(__name__)


def create_tables():
    """Create all database tables."""
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Tables created successfully")


def drop_tables():
    """Drop all database tables (use with caution)."""
    logger.warning("Dropping all database tables...")
    Base.metadata.drop_all(bind=engine)
    logger.info("Tables dropped successfully")


def seed_sample_data():
    """Add sample data for testing."""
    from datetime import datetime
    
    db = SessionLocal()
    try:
        # Check if sample data already exists
        count = db.query(DocumentFile).count()
        if count > 0:
            logger.info("Sample data already exists, skipping seed")
            return
        
        logger.info("Adding sample data...")
        
        # Create sample document
        sample_doc = DocumentFile(
            filename="sample_project.pdf",
            file_size=102400,
            file_type="pdf",
            upload_path="uploads/sample_project.pdf"
        )
        db.add(sample_doc)
        db.flush()
        
        # Create sample analysis
        sample_analysis = DocumentAnalysis(
            document_id=sample_doc.id,
            summary="Sample project analysis. This is a test document for the analysis system.",
            full_analysis="Full analysis of the sample project...",
            status="completed",
            ai_model="llama-3.1-8b-instant"
        )
        db.add(sample_analysis)
        db.flush()
        
        # Create sample risks
        sample_risks = [
            AnalysisRisk(
                analysis_id=sample_analysis.id,
                description="Timeline allocation needs verification",
                severity="medium",
                category="timeline"
            ),
            AnalysisRisk(
                analysis_id=sample_analysis.id,
                description="Database integrations require review",
                severity="high",
                category="technical"
            ),
            AnalysisRisk(
                analysis_id=sample_analysis.id,
                description="Load testing pending for MVP",
                severity="medium",
                category="testing"
            ),
        ]
        for risk in sample_risks:
            db.add(risk)
        
        db.commit()
        logger.info("Sample data added successfully")
    
    except Exception as e:
        logger.error(f"Error seeding data: {str(e)}")
        db.rollback()
    
    finally:
        db.close()


def verify_database():
    """Verify database connection and tables."""
    try:
        db = SessionLocal()
        
        # Test connection
        result = db.execute(text("SELECT 1"))
        logger.info("Database connection verified")
        
        # Check tables
        inspector_query = text(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
        tables = db.execute(inspector_query).fetchall()
        logger.info(f"Found {len(tables)} tables: {[t[0] for t in tables]}")
        
        db.close()
        return True
    
    except Exception as e:
        logger.error(f"Database verification failed: {str(e)}")
        return False


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    
    # Create tables
    create_tables()
    
    # Verify
    if verify_database():
        logger.info("Database setup completed successfully")
    else:
        logger.error("Database setup failed")
