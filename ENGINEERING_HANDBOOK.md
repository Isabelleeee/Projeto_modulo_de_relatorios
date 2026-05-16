# 📘 Engineering Handbook - Projeto Análise de Documentos

**Versão**: 1.0  
**Data**: Maio 2026  
**Status**: Production Ready  

---

## 📑 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Setup do Ambiente](#setup-do-ambiente)
5. [Guia de Desenvolvimento](#guia-de-desenvolvimento)
6. [Estrutura de Pastas](#estrutura-de-pastas)
7. [APIs e Endpoints](#apis-e-endpoints)
8. [Padrões de Código](#padrões-de-código)
9. [Fluxo de Deployment](#fluxo-de-deployment)
10. [Troubleshooting](#troubleshooting)
11. [Referência de Comandos](#referência-de-comandos)

---

## Visão Geral do Projeto

### O Projeto
Sistema web para análise de documentos utilizando inteligência artificial (Groq API). Permite que usuários façam upload de arquivos (PDF, Markdown), obtenham análises inteligentes e gerem relatórios em múltiplos formatos.

### Características Principais
- ✅ Upload e análise de documentos (PDF, Markdown)
- ✅ Análise com IA via Groq API
- ✅ Geração de relatórios (Markdown, PDF, DOCX)
- ✅ Interface responsiva e intuitiva
- ✅ Backend robusto com validação
- ✅ Suporte a múltiplos formatos de exportação

### Público-Alvo
Profissionais que precisam analisar documentos rapidamente com suporte de IA.

---

## Stack Tecnológico

### Frontend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React | 18.3.1 | Framework UI |
| TypeScript | 6.0.3 | Type-safe development |
| Vite | 6.3.5 | Build tool e dev server |
| Tailwind CSS | 4.1.12 | Styling utility-first |
| React Router | 7.13.0 | Client-side routing |
| Radix UI | Latest | Accessible components library |
| Motion (Framer) | 12.23.24 | Animations |
| React Hook Form | 7.55.0 | Form state management |
| Recharts | 2.15.2 | Data visualization |
| Sonner | 2.0.3 | Toast notifications |

### Backend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| Python | 3.14.2 | Runtime |
| FastAPI | Latest | API framework |
| SQLAlchemy | Latest | ORM database |
| SQLite | Latest | Database |
| Groq API | Latest | IA integration |
| Pydantic | Latest | Data validation |
| Python-multipart | Latest | File uploads |
| Python-dotenv | Latest | Environment variables |

### DevOps & Deployment
| Tecnologia | Propósito |
|-----------|----------|
| Docker & Docker Compose | Containerization |
| GitHub Actions | CI/CD |
| Azure App Service | Hosting |
| Azure Container Registry | Image storage |

### Development Tools
| Ferramenta | Versão | Propósito |
|-----------|--------|----------|
| ESLint | 8.57.1 | Linting |
| Prettier | 3.8.3 | Code formatting |
| npm | Latest | Package manager (Frontend) |
| pip | Latest | Package manager (Backend) |

---

## Arquitetura do Projeto

### Arquitetura Geral
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│              src/ - TypeScript + Tailwind                │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/CORS
                         ↓
┌─────────────────────────────────────────────────────────┐
│                Backend (FastAPI)                         │
│    backend/app/ - Routes, Services, Models              │
│    backend/core/ - Config, Database                     │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   SQLite DB        Groq API      File System
   (project_analysis.db)          (uploads/)
```

### Frontend Architecture
```
src/
├── lib/              # Utilities & APIs
│   ├── api-client.ts # HTTP client
│   └── utils/        # Helper functions
├── features/         # Feature modules
│   └── documents/    # Document service
├── hooks/            # Custom React hooks
├── app/              # Main app structure
│   ├── components/   # React components
│   ├── pages/        # Page components
│   └── layout.tsx    # Root layout
└── styles/           # Global styles
```

### Backend Architecture
```
backend/
├── app/              # Application code
│   ├── main.py       # FastAPI app entrypoint
│   ├── routes/       # API endpoints
│   │   ├── documents.py
│   │   └── health.py
│   ├── services/     # Business logic
│   │   ├── document_service.py
│   │   ├── groq_service.py
│   │   └── report_service.py
│   ├── utils/        # Utilities
│   │   ├── validators.py
│   │   └── errors.py
│   └── models/       # Database models
├── core/             # Core config
│   ├── config.py     # Settings
│   └── database.py   # SQLAlchemy setup
├── .env              # Environment variables (NOT in git)
├── requirements.txt  # Python dependencies
└── main.py           # Compatibility wrapper
```

### Fluxo de Dados
1. **Upload**: Cliente → Frontend → Backend `/upload` → Arquivo salvo em `uploads/`
2. **Análise**: Frontend → Backend `/analyze` → Groq API → Resposta salva em DB
3. **Download**: Frontend → Backend `/download/{report_id}` → Arquivo gerado → Download

---

## Setup do Ambiente

### Pré-requisitos
- Node.js 18+ (para frontend)
- Python 3.10+ (para backend)
- Git
- Conta Groq (API key)
- Docker & Docker Compose (opcional, para containerization)

### Setup Local Completo

#### 1️⃣ Clone e Navegue
```bash
cd "Protótipo Projeto Eng_soft"
```

#### 2️⃣ Setup Backend
```bash
# Criar virtual environment
python -m venv .venv

# Ativar (Windows)
.venv\Scripts\Activate.ps1
# ou (macOS/Linux)
source .venv/bin/activate

# Instalar dependências
pip install -r backend/requirements.txt

# Criar arquivo .env
cd backend
cat > .env << EOF
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
UPLOAD_DIR=uploads
MAX_FILE_SIZE=52428800
ALLOWED_EXTENSIONS=pdf,md,markdown
GROQ_MODEL=mixtral-8x7b-32768
EOF
cd ..
```

#### 3️⃣ Setup Frontend
```bash
# Instalar dependências
npm install --legacy-peer-deps

# Criar .env.local (opcional, para custom API URL)
echo "VITE_API_URL=http://localhost:8000" > .env.local
```

#### 4️⃣ Verificar Configuração
```bash
# Backend: testar imports
python -c "from backend.app.main import app; print('✓ Backend imports OK')"

# Frontend: build test
npm run build

# Frontend: lint
npm run lint
```

---

## Guia de Desenvolvimento

### Workflow Padrão

#### Desenvolvimento Local
```bash
# Terminal 1: Backend
cd backend
python -m uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
npm run dev  # Vite dev server em http://localhost:5173
```

#### Adicionar Nova Feature

**Backend (API)**:
1. Criar novo arquivo em `backend/app/routes/` ou `backend/app/services/`
2. Adicionar rota em `backend/app/main.py` ou novo arquivo de routes
3. Implementar com FastAPI

```python
# Exemplo: Novo endpoint
from fastapi import APIRouter, UploadFile

router = APIRouter()

@router.post("/new-feature")
async def new_feature(file: UploadFile):
    # Implementação
    pass
```

4. Registrar em `main.py`:
```python
from backend.app.routes import new_route
app.include_router(new_route.router, prefix="/api")
```

**Frontend (Interface)**:
1. Criar componente em `src/app/components/`
2. Criar página em `src/app/pages/` se necessário
3. Adicionar rota em `src/app/routes.tsx`
4. Usar hook `use-api` para chamadas API

```typescript
// Exemplo: Novo componente
import { useApi } from "@hooks/use-api";

export function NewFeature() {
  const { data, loading, error } = useApi("/api/new-feature", "POST");
  // Renderizar
}
```

#### Testing & Validation
```bash
# Lint check
npm run lint

# Format code
npm run format

# Build check
npm run build

# Backend validation
python -m py_compile backend/**/*.py
```

### Padrões de Código

#### Frontend - TypeScript

**Tipos seguros**:
```typescript
// ✅ BOM - Use types específicos
interface DocumentAnalysis {
  id: string;
  content: string;
  analysis: Record<string, unknown>;
}

// ❌ EVITAR - Use de `any`
const data: any = response.data;
```

**Hooks customizados**:
```typescript
// src/hooks/use-custom.ts
import { useState, useEffect } from 'react';

export function useCustom() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // effect logic
  }, []);
  
  return { state };
}
```

**Componentes**:
```typescript
// Usar TypeScript props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

#### Backend - Python

**Validação com Pydantic**:
```python
from pydantic import BaseModel, Field

class DocumentUploadSchema(BaseModel):
    filename: str
    size: int = Field(..., gt=0, le=52428800)
```

**Error Handling**:
```python
from fastapi import HTTPException

@router.get("/item/{item_id}")
async def get_item(item_id: str):
    if not item_id:
        raise HTTPException(status_code=400, detail="Invalid ID")
    return {"item_id": item_id}
```

**Async Operations**:
```python
from fastapi import BackgroundTasks

@router.post("/process")
async def process(background_tasks: BackgroundTasks):
    background_tasks.add_task(long_running_task)
    return {"status": "processing"}

async def long_running_task():
    # async operation
    pass
```

#### Imports Organization

**Frontend** (barrel imports):
```typescript
// src/lib/index.ts
export * from './api-client';
export * from './utils';

// Usage
import { apiClient } from '@lib';
```

**Backend** (hierarchical):
```python
# backend/app/routes/__init__.py
from backend.app.routes.documents import router as documents_router
# Use: app.include_router(documents_router)
```

---

## Estrutura de Pastas

### Frontend - `src/`
```
src/
├── main.tsx                    # React entry point
├── lib/
│   ├── api-client.ts          # HTTP client singleton
│   └── utils.ts               # Utility functions
├── features/
│   └── documents/
│       └── document-service.ts # Document operations
├── hooks/
│   └── use-api.ts             # API hook
├── app/
│   ├── App.tsx                # Main component
│   ├── layout.tsx             # Root layout
│   ├── routes.tsx             # Route definitions
│   ├── components/
│   │   ├── figma/             # Figma-specific
│   │   └── ui/                # Shadcn/Radix components
│   └── pages/
│       ├── Home.tsx           # Homepage
│       ├── Reports.tsx        # Reports list
│       ├── ReportDetail.tsx   # Report details
│       └── Settings.tsx       # Settings page
└── styles/
    ├── index.css              # Global
    ├── theme.css              # Theme
    ├── fonts.css              # Fonts
    └── tailwind.css           # Tailwind
```

### Backend - `backend/`
```
backend/
├── main.py                    # Compatibility wrapper
├── config.py                  # Re-export from core
├── database.py                # Re-export from core
├── routes/                    # Re-export from app
├── services/                  # Re-export from app
├── models.py                  # Re-export from app
├── schemas.py                 # Re-export from app
├── requirements.txt           # Dependencies
├── .env                       # Env variables (local only)
├── uploads/                   # User uploaded files
├── app/
│   ├── main.py               # FastAPI app initialization
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── documents.py      # /api/documents/* endpoints
│   │   └── health.py         # Health check endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── document_service.py    # File handling
│   │   ├── groq_service.py        # AI integration
│   │   └── report_service.py      # Report generation
│   ├── models/
│   │   ├── __init__.py
│   │   └── document.py       # SQLAlchemy models
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── document.py       # Pydantic schemas
│   └── utils/
│       ├── __init__.py
│       ├── validators.py     # File validators
│       └── errors.py         # Custom exceptions
└── core/
    ├── __init__.py
    ├── config.py             # Settings/config
    ├── database.py           # SQLAlchemy setup
    └── models.py             # Base models
```

---

## APIs e Endpoints

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-azure-app.azurewebsites.net`

### Document Endpoints

#### Upload Document
```http
POST /api/documents/upload
Content-Type: multipart/form-data

Body:
  file: <PDF or Markdown file>

Response (200):
{
  "id": "doc_123",
  "filename": "report.pdf",
  "size": 1024,
  "created_at": "2026-05-16T10:00:00Z"
}

Error (400):
{
  "detail": "Invalid file format. Allowed: pdf, md"
}
```

#### Analyze Document
```http
POST /api/documents/analyze
Content-Type: application/json

Body:
{
  "document_id": "doc_123"
}

Response (200):
{
  "analysis_id": "analysis_456",
  "document_id": "doc_123",
  "analysis": {
    "summary": "...",
    "key_points": [...],
    "sentiment": "..."
  },
  "created_at": "2026-05-16T10:01:00Z"
}
```

#### Download Report
```http
GET /api/documents/download/{report_id}?format=pdf

Response (200):
  <Binary PDF/DOCX file>

Parameters:
  format: "pdf" | "docx" | "md"

Error (404):
  {"detail": "Report not found"}
```

#### List Documents
```http
GET /api/documents/list

Response (200):
{
  "documents": [
    {
      "id": "doc_123",
      "filename": "report.pdf",
      "size": 1024,
      "created_at": "2026-05-16T10:00:00Z"
    }
  ]
}
```

#### Delete Document
```http
DELETE /api/documents/{document_id}

Response (200):
  {"message": "Document deleted"}

Error (404):
  {"detail": "Document not found"}
```

### Health Check
```http
GET /health

Response (200):
{
  "status": "ok",
  "version": "1.0.0",
  "database": "connected"
}
```

---

## Padrões de Código

### Frontend Best Practices

#### 1️⃣ Component Structure
```typescript
// Always use named exports
export interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return <div onClick={onAction}>{title}</div>;
}

// Default export for lazy loading
export default MyComponent;
```

#### 2️⃣ API Calls
```typescript
// Use the useApi hook
import { useApi } from '@hooks/use-api';

function MyComponent() {
  const { data, loading, error } = useApi(
    '/api/endpoint',
    'GET'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data}</div>;
}
```

#### 3️⃣ State Management
```typescript
// Use useState for local state
const [count, setCount] = useState(0);

// Use React Context for global state if needed
const [globalState, setGlobalState] = useContext(AppContext);
```

#### 4️⃣ Styling
```typescript
// Tailwind classes for styling
<div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
  
// Use clsx for conditional styles
import { clsx } from 'clsx';
<button className={clsx(
  'px-4 py-2 rounded',
  isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'
)}>
```

### Backend Best Practices

#### 1️⃣ Response Format
```python
# Always return consistent response structure
@router.get("/items")
async def list_items():
    return {
        "status": "success",
        "data": items,
        "count": len(items)
    }
```

#### 2️⃣ Error Handling
```python
# Use HTTPException for API errors
from fastapi import HTTPException

@router.get("/item/{item_id}")
async def get_item(item_id: str):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
```

#### 3️⃣ Logging
```python
import logging

logger = logging.getLogger(__name__)

@router.post("/process")
async def process_item(item_id: str):
    logger.info(f"Processing item {item_id}")
    try:
        result = do_something(item_id)
        logger.info(f"Successfully processed {item_id}")
        return result
    except Exception as e:
        logger.error(f"Failed to process {item_id}: {str(e)}")
        raise
```

#### 4️⃣ Database Queries
```python
from backend.core.database import get_db

@router.get("/items")
async def list_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()
    return items

@router.post("/items")
async def create_item(item: ItemSchema, db: Session = Depends(get_db)):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
```

---

## Fluxo de Deployment

### Deploy Local via Docker

#### 1️⃣ Build Images
```bash
# Frontend
docker build -t document-analyzer:frontend -f Dockerfile.frontend .

# Backend
docker build -t document-analyzer:backend -f Dockerfile.backend .
```

#### 2️⃣ Run with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all
docker-compose down
```

### Deploy no Azure

#### 1️⃣ Configurar GitHub Secrets
No GitHub (Settings → Secrets):
```
AZURE_CREDENTIALS: {
  "clientId": "xxx",
  "clientSecret": "xxx",
  "subscriptionId": "xxx",
  "tenantId": "xxx"
}
AZURE_WEBAPP_NAME: seu-app-name
GROQ_API_KEY: seu-groq-key
```

#### 2️⃣ Trigger Deploy
```bash
# Push para main branch
git add .
git commit -m "Production deployment"
git push origin main

# GitHub Actions executa automaticamente
# Workflow: .github/workflows/deploy.yml
```

#### 3️⃣ Monitorar Deploy
- GitHub: Actions tab mostra status
- Azure: App Service → Deployment Center
- Logs: Azure Monitor ou VS Code Azure extension

### Database Migrations

#### Setup Inicial
```bash
# Backend
cd backend
python -m alembic init -t async migrations
python -m alembic revision --autogenerate -m "Initial setup"
python -m alembic upgrade head
```

#### Nova Migration
```bash
python -m alembic revision --autogenerate -m "Add new column"
python -m alembic upgrade head
```

---

## Troubleshooting

### Frontend Issues

#### Issue: "Module not found" errors
```
Solução:
1. Verificar @alias no vite.config.ts
2. npm install --legacy-peer-deps
3. Limpar node_modules: rm -rf node_modules && npm install
```

#### Issue: ESLint errors
```
Solução:
1. npm run format   # Prettier formatting
2. npm run lint     # Check errors
3. Verificar .eslintrc.json
```

#### Issue: Build fails "react/jsx-runtime"
```
Solução:
1. Verificar React instalado: npm list react
2. Adicionar em package.json dependencies (não devDependencies)
3. npm install react@18.3.1 react-dom@18.3.1
```

### Backend Issues

#### Issue: "ModuleNotFoundError: No module named 'backend'"
```
Solução:
1. Ativar virtual environment: .venv\Scripts\Activate.ps1
2. pip install -r backend/requirements.txt
3. Verificar PYTHONPATH: export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

#### Issue: Database connection error
```
Solução:
1. Verificar DATABASE_URL em backend/.env
2. Verificar permission na pasta backend/
3. Deletar projeto_analysis.db e recriar: rm backend/projeto_analysis.db
```

#### Issue: CORS error
```
Solução:
1. Verificar CORS_ORIGINS em backend/.env
2. Incluir http://localhost:5173 para desenvolvimento
3. Backend config: backend/core/config.py
```

#### Issue: Groq API error
```
Solução:
1. Verificar GROQ_API_KEY em backend/.env
2. Testar key: curl -H "Authorization: Bearer YOUR_KEY" https://api.groq.com/
3. Verificar quota/limite de requisições
```

### Docker Issues

#### Issue: Port already in use
```bash
# Liberar porta
lsof -i :8000        # Check what's using port
kill -9 <PID>        # Kill the process

# ou usar portas diferentes
docker-compose -f docker-compose.yml -p ports -e PORT_BACKEND=8001 up
```

#### Issue: Image build fails
```bash
# Limpar cache
docker system prune -a
docker-compose build --no-cache
```

---

## Referência de Comandos

### NPM Commands (Frontend)
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run lint         # Check lint errors
npm run format       # Auto format with Prettier
npm install          # Install dependencies
npm uninstall <pkg>  # Remove package
npm list             # List all packages
npm audit            # Check vulnerabilities
```

### Python Commands (Backend)
```bash
# Virtual Environment
python -m venv .venv
.venv\Scripts\Activate.ps1

# Dependencies
pip install -r backend/requirements.txt
pip freeze > backend/requirements.txt

# Running
python -m uvicorn backend.main:app --reload
python -m uvicorn backend.app.main:app --reload

# Testing
python -m py_compile backend/**/*.py

# Debugging
python -m pdb backend/main.py
```

### Git Commands
```bash
git status
git add .
git commit -m "message"
git push origin main
git pull origin main
git log --oneline
git branch -a
```

### Docker Commands
```bash
docker build -t image-name .
docker run -p 8000:8000 image-name
docker-compose up -d
docker-compose logs -f
docker-compose down
docker ps
docker images
docker rm <container>
docker rmi <image>
```

---

## Checklist de Pre-Deployment

### Antes de fazer Push para Main (Deploy)

- [ ] **Frontend**
  - [ ] `npm run build` - sucesso
  - [ ] `npm run lint` - sem erros
  - [ ] Testar em http://localhost:5173 localmente
  - [ ] Testar responsividade (mobile/tablet/desktop)

- [ ] **Backend**
  - [ ] `python -m py_compile backend/**/*.py` - sem erros
  - [ ] Servidor inicia sem erros: `python -m uvicorn backend.main:app`
  - [ ] Health check: `curl http://localhost:8000/health`
  - [ ] Testar upload de arquivo
  - [ ] Testar análise com Groq API
  - [ ] Verificar `.env` está em `.gitignore`

- [ ] **Código**
  - [ ] Sem console.log(), print() deixados acidentalmente
  - [ ] Sem comentários de debug
  - [ ] Tipos TypeScript corretos (sem `any`)
  - [ ] Imports organizados

- [ ] **Configuração**
  - [ ] `.env` atualizado com valores corretos
  - [ ] `GROQ_API_KEY` configurada
  - [ ] `CORS_ORIGINS` inclui frontend URL
  - [ ] Database URL correto
  - [ ] GitHub Secrets configuradas (Azure)

- [ ] **Documentação**
  - [ ] README.md atualizado
  - [ ] AZURE_DEPLOYMENT.md review
  - [ ] Mudanças documentadas se necessário

---

## Contatos & Recursos

### Documentação Externa
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Groq API Docs](https://console.groq.com/docs)

### Azure Resources
- [Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/)
- [GitHub Actions + Azure](https://github.com/Azure/actions)

### Ambiente Local
- `.env` location: `backend/.env`
- Database: `backend/project_analysis.db`
- Uploads: `backend/uploads/`
- Logs: Console output ou arquivo configurable

---

## Notas Importantes

### ⚠️ Security
- **Nunca** commit `.env` arquivo
- **Nunca** commit chaves API no código
- Use GitHub Secrets para Azure credentials
- Validar todos os uploads de arquivo
- Sanitizar inputs do usuário

### 📌 Performance
- Lazy load React components
- Usar React.memo para componentes puros
- Cache API responses quando apropriado
- Otimizar bundle size (check via `npm run build`)
- Monitor backend response times

### 🔄 Maintenance
- Revisar dependências regularmente: `npm outdated`, `pip list`
- Update security patches imediatamente
- Backup database regularmente
- Monitor logs para errors
- Test após atualizações

---

**Última atualização**: Maio 2026  
**Maintainer**: Engineering Team  
**Status**: Production Ready ✅
