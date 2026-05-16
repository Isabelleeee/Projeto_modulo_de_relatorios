# 🚀 Quick Reference Guide - Cheat Sheet

**Para consulta rápida durante desenvolvimento**

---

## 🏃 Quick Start

### Setup Inicial
```bash
# Clone/Navigate
cd "Protótipo Projeto Eng_soft"

# Backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
cd backend && cat > .env << EOF
GROQ_API_KEY=your_key
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
EOF
cd ..

# Frontend
npm install --legacy-peer-deps

# Verify
npm run build && npm run lint
```

### Desenvolvimento Diário
```bash
# Terminal 1: Backend
cd backend
python -m uvicorn main:app --reload

# Terminal 2: Frontend
npm run dev

# Terminal 3: Tests/Checks
npm run lint
npm run format
```

---

## 📂 File Locations Quick Map

| O que preciso? | Onde está? |
|---|---|
| API client | `src/lib/api-client.ts` |
| API hooks | `src/hooks/use-api.ts` |
| UI Components | `src/app/components/ui/` |
| Pages/Routes | `src/app/pages/`, `src/app/routes.tsx` |
| API Endpoints | `backend/app/routes/documents.py` |
| Business Logic | `backend/app/services/` |
| Database | `backend/core/database.py` |
| Settings | `backend/core/config.py` |
| Env Variables | `backend/.env` |

---

## 🔧 Common Tasks

### Add Frontend Component
```typescript
// 1. Create component file
// src/app/components/MyComponent.tsx

import { useState } from 'react';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  const [state, setState] = useState(null);
  
  return (
    <div className="p-4">
      <h1>{title}</h1>
    </div>
  );
}

// 2. Import in route/page
// src/app/pages/Home.tsx
import { MyComponent } from '@components/MyComponent';

function Home() {
  return <MyComponent title="Hello" />;
}

// 3. Lint & format
npm run lint
npm run format
```

### Add Backend Endpoint
```python
# 1. Create service method
# backend/app/services/my_service.py

async def process_data(data: str):
    # your logic
    return {"result": data}

# 2. Create route
# backend/app/routes/my_route.py

from fastapi import APIRouter
from backend.app.services.my_service import process_data

router = APIRouter()

@router.post("/process")
async def process_endpoint(data: dict):
    result = await process_data(data["value"])
    return {"status": "success", "data": result}

# 3. Register in main.py
# backend/app/main.py

from backend.app.routes import my_route
app.include_router(my_route.router, prefix="/api")

# 4. Test
# python -m uvicorn backend.main:app --reload
# curl -X POST http://localhost:8000/api/process -d '{"value":"test"}'
```

### Use API Hook
```typescript
// src/app/pages/Example.tsx

import { useApi } from '@hooks/use-api';

export function Example() {
  // GET request
  const { data, loading, error } = useApi('/api/documents/list', 'GET');
  
  // POST request with data
  const { data: response, loading: isSubmitting } = useApi(
    '/api/documents/upload',
    'POST',
    { formData: yourFileData }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### Call API Directly
```typescript
import { apiClient } from '@lib';

// GET
const data = await apiClient.get('/documents');

// POST
const response = await apiClient.post('/documents/analyze', {
  document_id: 'doc_123'
});

// PUT
await apiClient.put('/documents/123', { name: 'Updated' });

// DELETE
await apiClient.delete('/documents/123');
```

### Fetch from Backend
```python
from backend.core.database import get_db
from backend.app.models.document import Document
from sqlalchemy.orm import Session

async def get_all_documents(db: Session = Depends(get_db)):
    documents = db.query(Document).all()
    return documents

async def get_by_id(doc_id: str, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return doc
```

---

## 🐛 Debug Mode

### Frontend Debug
```typescript
// Add to any component
console.log('Debugging:', variable);

// Use React DevTools browser extension
// Or check Network tab for API calls

// Vite debug: http://localhost:5173/__vite_ping
```

### Backend Debug
```python
# Use logging
import logging
logger = logging.getLogger(__name__)
logger.info(f"Debug info: {variable}")
logger.error(f"Error: {e}")

# Or direct print (development only)
print(f"Debug: {variable}")

# Or use pdb
import pdb; pdb.set_trace()
```

### Check Database
```bash
# Open SQLite database
sqlite3 backend/project_analysis.db

# In SQLite shell:
.tables              # List all tables
SELECT * FROM documents;  # Query
.exit                # Exit
```

---

## ✅ Pre-Commit Checklist

```bash
# Before git push:

# 1. Format code
npm run format

# 2. Lint check
npm run lint

# 3. Build test
npm run build

# 4. Backend syntax check
python -m py_compile backend/**/*.py

# 5. Backend startup test
python -m uvicorn backend.main:app &
sleep 2
curl http://localhost:8000/health
kill %1

# 6. Check git status
git status

# 7. Commit and push
git add .
git commit -m "Feature: description"
git push origin main
```

---

## 🔗 API Endpoints Summary

```
GET  /health                           Health check
POST /api/documents/upload              Upload file
POST /api/documents/analyze             Analyze document
GET  /api/documents/list                List all docs
GET  /api/documents/download/{id}       Download report
DELETE /api/documents/{id}              Delete document
```

---

## 📦 Dependencies Quick Reference

### Frontend Key Packages
- `react@18.3.1` - UI framework
- `typescript@6.0.3` - Type safety
- `tailwindcss@4.1.12` - CSS utility
- `react-router@7.13.0` - Routing
- `react-hook-form@7.55.0` - Forms

### Backend Key Packages
- `fastapi` - API framework
- `sqlalchemy` - ORM
- `pydantic` - Data validation
- `python-multipart` - File uploads
- `groq` - AI API

---

## 🚨 Emergency Fixes

### "npm error Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### "python: command not found"
```bash
# Activate venv
.venv\Scripts\Activate.ps1
```

### "Port 8000 already in use"
```bash
# Kill process
Get-Process | Where-Object {$_.Port -eq 8000}
Stop-Process -Id <PID> -Force

# Or use different port
python -m uvicorn backend.main:app --port 8001
```

### "Backend not responding"
```bash
# Check if running
curl http://localhost:8000/health

# Restart
# Kill terminal, run again: python -m uvicorn backend.main:app --reload
```

### "Database locked"
```bash
# Delete and recreate
rm backend/project_analysis.db
# Restart backend
```

---

## 📝 File Structure Template

### New Frontend Component
```typescript
// src/app/components/YourComponent.tsx

import { useState, useEffect } from 'react';
import { useApi } from '@hooks/use-api';

interface YourComponentProps {
  title: string;
  onAction?: () => void;
}

export function YourComponent({ title, onAction }: YourComponentProps) {
  const [state, setState] = useState<string>('');
  const { data, loading } = useApi('/api/endpoint', 'GET');

  useEffect(() => {
    // effect logic
  }, []);

  const handleClick = () => {
    setState('new value');
    onAction?.();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Click Me
      </button>
    </div>
  );
}

export default YourComponent;
```

### New Backend Service
```python
# backend/app/services/your_service.py

import logging
from fastapi import HTTPException
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

async def your_service_function(param: str, db: Session):
    """
    Description of what this does.
    
    Args:
        param: Parameter description
        db: Database session
        
    Returns:
        Result description
    """
    try:
        logger.info(f"Processing: {param}")
        
        # Your logic here
        result = {"processed": param}
        
        return result
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
```

### New Backend Route
```python
# backend/app/routes/your_route.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.app.services.your_service import your_service_function

router = APIRouter(tags=["your_feature"])

@router.post("/your-endpoint")
async def your_endpoint(
    data: dict,
    db: Session = Depends(get_db)
):
    """Your endpoint description."""
    result = await your_service_function(data["param"], db)
    return {"status": "success", "data": result}

@router.get("/your-endpoint/{id}")
async def get_endpoint(id: str, db: Session = Depends(get_db)):
    """Get specific item."""
    # Logic here
    return {"id": id, "data": "..."}
```

---

## 🌐 Environment Variables Reference

### Backend `.env` (backend/.env)
```
GROQ_API_KEY=sk-proj-xxxxxxxxxxxxx
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
UPLOAD_DIR=uploads
MAX_FILE_SIZE=52428800
ALLOWED_EXTENSIONS=pdf,md,markdown
GROQ_MODEL=mixtral-8x7b-32768
```

### Frontend `.env.local` (optional)
```
VITE_API_URL=http://localhost:8000
```

---

## 🎯 Common Patterns

### Form with Validation (Frontend)
```typescript
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Conditional Rendering (Frontend)
```typescript
{isLoading && <LoadingSpinner />}
{error && <ErrorAlert message={error} />}
{data && <SuccessContent data={data} />}
```

### Error Handling (Backend)
```python
try:
    result = perform_operation()
except ValueError as e:
    raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
except Exception as e:
    logger.error(f"Unexpected error: {str(e)}")
    raise HTTPException(status_code=500, detail="Internal server error")
```

---

## 📊 Status Codes Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Auth failed |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Backend error |

---

**Last Updated**: May 2026  
**Quick & Practical Reference** ⚡
