# Backend Documentation

## Overview

The backend is a **FastAPI** application that provides AI-powered document analysis using the **Groq AI API** (LLaMA 3.1 8B).

## Architecture

```
backend/
├── main.py              # FastAPI app entry point
├── config.py            # Configuration & settings
├── database.py          # SQLAlchemy setup
├── models.py            # SQLAlchemy ORM models
├── schemas.py           # Pydantic validation schemas
├── migrate.py           # Database migrations
│
├── routes/              # API endpoints
│   ├── documents.py     # Document upload & analysis endpoints
│   └── health.py        # Health check endpoints
│
├── services/            # Business logic & external APIs
│   ├── document_service.py  # File handling & extraction
│   └── groq_service.py      # Groq AI integration
│
├── utils/               # Utilities & helpers
│   ├── errors.py        # Custom exception classes
│   └── validators.py    # Input validation functions
│
└── uploads/             # File storage directory
```

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Copy and fill `.env.local`:

```bash
cp ../.env.example .env
```

Required variables:
```
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Initialize Database

```bash
python migrate.py
```

This will:
- Create SQLite database
- Create all tables
- Add sample data (optional)

### 4. Start Development Server

```bash
python -m uvicorn main:app --reload
```

Server will start at: **http://localhost:8000**

API documentation (interactive): **http://localhost:8000/docs**

---

## API Endpoints

### Health Check
- `GET /health` - Basic health check
- `GET /health/db` - Database connectivity
- `GET /api/status` - Detailed status

### Documents
- `POST /api/documents/upload` - Upload file for analysis
- `POST /api/documents/analyze/{file_id}` - Analyze document
- `GET /api/documents/{file_id}` - Get document with latest analysis
- `GET /api/documents` - List all documents (paginated)
- `DELETE /api/documents/{file_id}` - Delete document

---

## Database Models

### DocumentFile
Represents an uploaded document.
- `id` (PK)
- `filename` - Original filename
- `file_size` - File size in bytes
- `file_type` - Extension (pdf, md, txt)
- `upload_path` - Stored file path
- `uploaded_at` - Upload timestamp

### DocumentAnalysis
Represents AI analysis of a document.
- `id` (PK)
- `document_id` (FK) - Reference to DocumentFile
- `summary` - AI-generated summary
- `full_analysis` - Full analysis text
- `status` - Analysis status (pending, completed, failed)
- `analyzed_at` - Analysis timestamp
- `analysis_duration` - Processing time (seconds)
- `ai_model` - Model used (llama-3.1-8b-instant)

### AnalysisRisk
Represents risks identified in analysis.
- `id` (PK)
- `analysis_id` (FK) - Reference to DocumentAnalysis
- `description` - Risk description
- `severity` - Level (low, medium, high, critical)
- `category` - Risk category (timeline, technical, etc)
- `mitigation` - Suggested mitigation
- `identified_at` - Detection timestamp

---

## Services

### DocumentService
Handles file operations:
- `save_uploaded_file()` - Save & validate file
- `extract_text_from_pdf()` - Extract PDF text
- `extract_text_from_markdown()` - Extract Markdown text
- `extract_text()` - Detect type & extract
- `cleanup_temp_file()` - Delete temporary files

### GroqService
Handles AI analysis:
- `analyze_project_document()` - Generate analysis & risks
- `extract_risks_from_text()` - Parse risks from text

---

## Configuration

All settings are in `config.py`:

```python
# API
API_TITLE = "Project Analysis API"
API_VERSION = "1.0.0"

# File Upload
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = [".pdf", ".md"]

# AI
GROQ_MODEL = "llama-3.1-8b-instant"
AI_TEMPERATURE = 0.3

# Database
DATABASE_URL = "sqlite:///./project_analysis.db"

# CORS
CORS_ORIGINS = ["http://localhost:5173", "http://localhost:3000"]
```

---

## Error Handling

Custom exceptions in `utils/errors.py`:

| Exception | Status | Description |
|-----------|--------|-------------|
| `DocumentNotFoundError` | 404 | Document doesn't exist |
| `InvalidFileFormatError` | 400 | Wrong file type |
| `FileTooLargeError` | 413 | File exceeds size limit |
| `AnalysisProcessingError` | 500 | AI analysis failed |
| `AIServiceError` | 503 | Groq API unavailable |

---

## Logging

Logging configured in `main.py`:

```python
logging.basicConfig(level=settings.LOG_LEVEL)
logger = logging.getLogger(__name__)
```

Use in code:
```python
logger.info("Starting analysis...")
logger.error(f"Error: {str(e)}")
logger.warning("Resource limit reached")
```

---

## Testing

Run tests with pytest:

```bash
pytest

# With coverage
pytest --cov=.

# Specific test file
pytest tests/test_documents.py
```

---

## Performance Tips

1. **Optimize AI calls:**
   - Limit text to 6000 characters
   - Use temperature=0.3 for consistency
   - Cache results when possible

2. **Database optimization:**
   - Add indexes on frequently queried fields
   - Use pagination for large lists
   - Clean up old analyses periodically

3. **File handling:**
   - Validate file sizes before processing
   - Clean up temp files immediately
   - Consider S3/Blob storage for production

---

## Deployment

### Docker

```bash
# Build
docker build -f Dockerfile -t project-analysis-api .

# Run
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_key \
  project-analysis-api
```

### Azure App Service

See [AZURE_DEPLOYMENT.md](../AZURE_DEPLOYMENT.md)

---

## Troubleshooting

### Database locked error
```python
# Already fixed in config.py for SQLite
# For production, use PostgreSQL
```

### Groq API timeout
```python
# Increase timeout in groq_service.py
# Or implement retry logic
```

### CORS errors
```python
# Check CORS_ORIGINS in config.py
# Must match frontend domain
```

---

## Future Enhancements

- [ ] Switch to PostgreSQL for production
- [ ] Add authentication (JWT)
- [ ] Implement rate limiting
- [ ] Add caching layer (Redis)
- [ ] Create async analysis queue (Celery)
- [ ] Add WebSocket for real-time updates
- [ ] Implement audit logging
