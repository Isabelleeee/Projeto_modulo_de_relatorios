# Backend Documentation

## Overview

The backend is a **FastAPI** application that provides AI-powered document analysis using the **Groq AI API**.

## Architecture

The backend is implemented in `backend/app` while root-level wrappers keep the package import-friendly:

```
backend/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── models.py            # SQLAlchemy ORM models
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── routes/              # API routers
│   │   ├── documents.py
│   │   └── health.py
│   ├── services/            # Business logic and external integrations
│   │   ├── document_service.py
│   │   ├── groq_service.py
│   │   └── report_service.py
│   └── utils/               # Validation and custom errors
│       ├── errors.py
│       └── validators.py
├── core/                    # Shared configuration and database setup
│   ├── config.py
│   ├── database.py
│   └── __init__.py
├── config.py                # Compatibility wrapper for core settings
├── database.py              # Compatibility wrapper for core database
├── main.py                  # Compatibility wrapper for app entrypoint
├── models.py                # Compatibility wrapper for app models
├── schemas.py               # Compatibility wrapper for app schemas
├── routes/                  # Compatibility wrappers for routers
├── services/                # Compatibility wrappers for services
├── utils/                   # Compatibility wrappers for utils
├── migrate.py               # Database setup helpers
└── uploads/                 # File uploads storage
```

## Setup

### 1. Install dependencies

From the project root:

```bash
cd backend
python -m pip install -r requirements.txt
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill the required values:

```bash
cp ../.env.example .env
```

Required variables:

```env
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Initialize the database

Run the migration helper:

```bash
python migrate.py
```

This will:
- create the SQLite database
- create all tables
- optionally seed sample data if not already present

### 4. Start the development server

From inside `backend/`:

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or from the project root with the compatibility wrapper:

```bash
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Server will start at: **http://localhost:8000**

Interactive API docs: **http://localhost:8000/docs**

---

## API Endpoints

### Health Check
- `GET /health` - Basic health check
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe
- `GET /health/db` - Database connectivity check
- `GET /api/status` - Detailed API status

### Documents
- `POST /api/documents/upload` - Upload file for analysis
- `POST /api/documents/analyze/{file_id}` - Analyze uploaded document
- `GET /api/documents/{file_id}` - Get document with latest analysis
- `GET /api/documents/{file_id}/download/{report_format}` - Download report as markdown/pdf/docx
- `GET /api/documents` - List documents (paginated)
- `DELETE /api/documents/{file_id}` - Delete document and related analysis

---

## Running locally

Recommended startup flow:

```bash
cd backend
python -m uvicorn main:app --reload
```

Then open:

- `http://localhost:8000/docs`
- `http://localhost:8000/openapi.json`

## Key files

- `backend/app/main.py` - FastAPI application entrypoint
- `backend/core/config.py` - Central settings and environment loading
- `backend/core/database.py` - SQLAlchemy engine and session setup
- `backend/app/routes/documents.py` - Document upload, analysis, download, list, delete
- `backend/app/routes/health.py` - Health and readiness endpoints
- `backend/app/services/document_service.py` - File validation, save, and text extraction
- `backend/app/services/groq_service.py` - Groq AI integration
- `backend/app/services/report_service.py` - Report generation for markdown/pdf/docx
- `backend/app/utils/validators.py` - File validation helpers
- `backend/app/utils/errors.py` - Custom backend exception classes

---

## Notes

- The root `backend/` package includes compatibility wrappers so imports like `from backend.main import app` work.
- The upload directory is `backend/uploads/` and is ignored by git.
- Secrets and environment variables should remain in `.env` and not be committed.

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
