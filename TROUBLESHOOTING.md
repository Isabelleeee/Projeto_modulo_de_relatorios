# 🔧 Troubleshooting Guide - Problemas Comuns & Soluções

**Guia prático de resolução de problemas**

---

## 📋 Índice de Problemas

1. [Setup Issues](#setup-issues)
2. [Frontend Issues](#frontend-issues)
3. [Backend Issues](#backend-issues)
4. [Database Issues](#database-issues)
5. [API & Integration Issues](#api--integration-issues)
6. [Docker Issues](#docker-issues)
7. [Deployment Issues](#deployment-issues)
8. [Performance Issues](#performance-issues)

---

## Setup Issues

### ❌ "Python: command not found" / "python is not recognized"

**Sintomas:**
```
'python' is not recognized as an internal or external command
```

**Soluções:**

**Opção 1**: Usar python completo
```bash
# Windows
py -3.10 -m venv .venv

# macOS/Linux
python3 -m venv .venv
```

**Opção 2**: Verificar PATH
```bash
# Windows
where python
echo %PATH%

# macOS/Linux
which python
echo $PATH
```

**Opção 3**: Reinstalar Python
- Baixe de python.org
- Na instalação, marque "Add Python to PATH"
- Reinicie o terminal

---

### ❌ "npm: command not found"

**Sintomas:**
```
'npm' is not recognized as an internal or external command
```

**Soluções:**

1. Instale Node.js de nodejs.org
2. Verifique: `node --version && npm --version`
3. Se ainda não funcionar, adicione ao PATH manualmente

---

### ❌ ".venv activation doesn't work"

**Sintomas:**
```
# Windows error
& : File C:\...\Activate.ps1 cannot be loaded because running scripts is disabled
```

**Solução:**
```powershell
# Windows (abra PowerShell como Admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Depois rode:
.venv\Scripts\Activate.ps1

# Ou use CMD instead of PowerShell:
.venv\Scripts\activate.bat
```

**Alternativa (macOS/Linux)**:
```bash
source .venv/bin/activate
```

---

### ❌ "Permission denied" ao executar scripts

**Sintomas:**
```
Permission denied: './script.py'
```

**Solução (macOS/Linux)**:
```bash
chmod +x script.py
python script.py
```

---

## Frontend Issues

### ❌ "Module not found" - Import Error

**Sintomas:**
```
Cannot find module '@components/MyComponent'
Module not found: Error: Can't resolve '@pages/Home'
```

**Causa**: Alias não configurado corretamente

**Solução**:

1. Verificar `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/app/components'),
      '@pages': path.resolve(__dirname, './src/app/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
})
```

2. Regenerar node_modules:
```bash
npm install
npm run dev
```

3. Se ainda não funcionar, use imports relativos:
```typescript
// Em vez de:
import { MyComponent } from '@components/MyComponent'

// Use:
import { MyComponent } from '../../app/components/MyComponent'
```

---

### ❌ ESLint Errors - "Unexpected var / unused import"

**Sintomas:**
```
error: 'x' is assigned a value but never used
error: Unexpected var, use const or let instead
```

**Soluções Rápidas**:

```bash
# Executar formatter automaticamente
npm run format

# Ver todos os erros
npm run lint

# Aplicar refactoring
npm run lint -- --fix
```

**Se ainda houver erros**:

1. Remover imports não usados manualmente
2. Converter `var` para `const`/`let`
3. Executar format novamente

---

### ❌ "react/jsx-runtime" Build Error

**Sintomas:**
```
[vite]: Rollup failed to resolve import "react/jsx-runtime"
```

**Causa**: React não instalado ou em peerDependencies

**Solução**:

1. Verificar se React está instalado:
```bash
npm list react react-dom
```

2. Se não estiver, mover para dependencies:
```bash
npm install react@18.3.1 react-dom@18.3.1
```

3. Ou adicionar manualmente em package.json:
```json
{
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
npm install
```

4. Limpar cache e tentar novamente:
```bash
npm cache clean --force
rm -rf node_modules
npm install --legacy-peer-deps
npm run build
```

---

### ❌ "CORS Error" - No 'Access-Control-Allow-Origin'

**Sintomas:**
```
Access to XMLHttpRequest from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Soluções**:

**Frontend**:
1. Verificar API URL:
```typescript
// src/lib/api-client.ts
const API_BASE = process.env.VITE_API_URL || 'http://localhost:8000'
```

2. Criar `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

**Backend**:
1. Verificar `backend/core/config.py`:
```python
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]
```

2. Verificar `backend/app/main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

3. Ou verificar `backend/.env`:
```
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

### ❌ Dev Server Not Starting

**Sintomas:**
```
error when starting dev server:
Error: EADDRINUSE: address already in use :::5173
```

**Solução**:

```bash
# Opção 1: Matar processo na porta
lsof -i :5173
kill -9 <PID>

# Opção 2: Usar porta diferente
npm run dev -- --port 5174

# Opção 3: Limpar Windows port
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

### ❌ "Cannot read property of undefined"

**Sintomas**:
```
TypeError: Cannot read properties of undefined (reading 'map')
```

**Causa**: Acessar propriedade de objeto undefined/null

**Solução**:

```typescript
// ❌ ERRADO
{data.items.map(item => <div>{item.name}</div>)}

// ✅ CORRETO - Com verificação
{data?.items?.map(item => <div>{item.name}</div>)}

// ✅ CORRETO - Com condicional
{data && data.items && data.items.map(item => <div>{item.name}</div>)}

// ✅ CORRETO - Com default
{(data?.items || []).map(item => <div>{item.name}</div>)}
```

---

## Backend Issues

### ❌ "ModuleNotFoundError: No module named 'backend'"

**Sintomas**:
```
ModuleNotFoundError: No module named 'backend'
ImportError: No module named 'backend.app.main'
```

**Causa**: Virtual environment não ativado ou PYTHONPATH incorreto

**Soluções**:

1. Ativar virtual environment:
```bash
# Windows
.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate
```

2. Configurar PYTHONPATH (Windows PowerShell):
```powershell
$env:PYTHONPATH = "C:\path\to\project"
```

3. Configurar PYTHONPATH (CMD):
```cmd
set PYTHONPATH=%cd%
```

4. Teste imports:
```bash
python -c "from backend.app.main import app; print('OK')"
```

---

### ❌ "No module named 'fastapi'" ou outras dependências

**Sintomas**:
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solução**:

1. Verificar virtual environment ativado:
```bash
which python  # ou 'where python' no Windows
```

2. Instalar dependências:
```bash
pip install -r backend/requirements.txt
```

3. Verificar instalação:
```bash
pip list | grep fastapi
```

4. Reinstalar se necessário:
```bash
pip uninstall fastapi
pip install fastapi
```

---

### ❌ "Address already in use" - Port 8000 occupied

**Sintomas**:
```
OSError: [WinError 10048] Only one usage of each socket address
Address already in use
```

**Soluções**:

**Windows (PowerShell)**:
```powershell
# Encontrar processo
Get-Process | Where-Object {$_.Port -eq 8000}

# Ou
netstat -ano | findstr :8000

# Matar processo
Stop-Process -Id <PID> -Force
taskkill /PID <PID> /F
```

**Windows (CMD)**:
```cmd
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**macOS/Linux**:
```bash
lsof -i :8000
kill -9 <PID>
```

**Alternativa: Usar porta diferente**:
```bash
python -m uvicorn backend.main:app --port 8001
```

---

### ❌ "Database connection error"

**Sintomas**:
```
sqlite3.OperationalError: unable to open database file
sqlalchemy.exc.OperationalError: Cannot access database
```

**Causas**: Permissões, DATABASE_URL incorreta, arquivo bloqueado

**Soluções**:

1. Verificar DATABASE_URL em `backend/.env`:
```
DATABASE_URL=sqlite:///./project_analysis.db
```

2. Resetar database (deleta dados!):
```bash
cd backend
rm project_analysis.db
# Restart backend - recria database
```

3. Verificar permissões:
```bash
# Windows
icacls backend /grant:r "%USERNAME%":F /t

# macOS/Linux
chmod -R 755 backend
```

4. Tentar com caminho completo:
```python
# backend/core/database.py
DATABASE_URL = "sqlite:///C:/Users/i50056448/Downloads/project_analysis.db"
```

---

### ❌ ".env file not found" - Config Error

**Sintomas**:
```
Error loading .env file
Settings validation failed
```

**Solução**:

1. Verificar localização:
```bash
ls backend/.env  # ou 'dir backend\.env' no Windows
```

2. Criar se não existir:
```bash
cd backend
cat > .env << EOF
GROQ_API_KEY=your_key
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
EOF
```

3. Verificar se está no `.gitignore`:
```bash
grep ".env" .gitignore
```

---

### ❌ "Groq API Key Error"

**Sintomas**:
```
groq.error.AuthenticationError: Invalid API key
401 Unauthorized
```

**Soluções**:

1. Verificar chave em `backend/.env`:
```bash
grep GROQ_API_KEY backend/.env
```

2. Se vazio, obter em https://console.groq.com/

3. Adicionar chave:
```bash
# Windows PowerShell
$content = @"
GROQ_API_KEY=sk-proj-xxxxx
"@
$content | Out-File -FilePath backend/.env -Append
```

4. Testar acesso:
```python
from groq import Groq

client = Groq(api_key="your_key")
response = client.chat.completions.create(
    model="mixtral-8x7b-32768",
    messages=[{"role": "user", "content": "test"}]
)
print("✓ Groq API works!")
```

---

### ❌ "Syntax Error" - Python arquivo quebrado

**Sintomas**:
```
SyntaxError: invalid syntax
IndentationError: expected an indented block
```

**Verificar**:
```bash
python -m py_compile backend/app/routes/documents.py
```

**Causas comuns**:
- Indentação incorreta (tabs vs spaces)
- Falta de `:` no final de funções
- Importações incompletas

**Solução**: Verificar visualmente ou usar linter

---

## Database Issues

### ❌ "Database is locked"

**Sintomas**:
```
sqlite3.OperationalError: database is locked
```

**Causa**: Múltiplos acessos simultâneos ao SQLite

**Soluções**:

1. Reiniciar backend:
```bash
# Ctrl+C para parar
# Espere 2-3 segundos
# Inicie novamente
```

2. Deletar database (perdem dados!):
```bash
rm backend/project_analysis.db
# Reinicie backend para recriar
```

3. Implementar retry logic no backend:
```python
from sqlalchemy.pool import NullPool

engine = create_engine(
    DATABASE_URL,
    connect_args={"timeout": 15, "check_same_thread": False},
    poolclass=NullPool
)
```

---

### ❌ "Table doesn't exist"

**Sintomas**:
```
sqlite3.OperationalError: no such table: documents
```

**Solução**:

1. Verificar models estão importados:
```python
# backend/core/database.py
from backend.app.models.document import Document

def init_db():
    Base.metadata.create_all(bind=engine)
```

2. Chamar init_db on startup:
```python
# backend/app/main.py
from backend.core.database import init_db

@app.on_event("startup")
async def startup_event():
    init_db()
```

3. Deletar database e recriar:
```bash
rm backend/project_analysis.db
# Restart backend
```

---

## API & Integration Issues

### ❌ "File upload fails"

**Sintomas**:
```
Error uploading file
422 Unprocessable Entity
```

**Causas**: Arquivo muito grande, tipo inválido

**Soluções**:

1. Verificar tamanho máximo em `backend/core/config.py`:
```python
MAX_FILE_SIZE = 52428800  # 50MB
```

2. Aumentar se necessário:
```python
MAX_FILE_SIZE = 104857600  # 100MB
```

3. Verificar tipos aceitos:
```python
ALLOWED_EXTENSIONS = ["pdf", "md", "markdown"]
```

4. Frontend validação:
```typescript
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

function validateFile(file: File) {
  if (file.size > MAX_SIZE) {
    throw new Error('File too large');
  }
  if (!['application/pdf', 'text/markdown'].includes(file.type)) {
    throw new Error('Invalid file type');
  }
}
```

---

### ❌ "404 Endpoint not found"

**Sintomas**:
```
404 Not Found
Cannot POST /api/documents/analyze
```

**Soluções**:

1. Verificar endpoint existe:
```bash
curl http://localhost:8000/api/documents/analyze -X POST -H "Content-Type: application/json" -d '{"id":"test"}'
```

2. Verificar route registrada em `backend/app/main.py`:
```python
from backend.app.routes import documents
app.include_router(documents.router, prefix="/api")
```

3. Verificar URL no frontend:
```typescript
const response = await apiClient.post('/api/documents/analyze', {...})
```

4. Se usando `apiClient`, verificar base URL:
```typescript
// src/lib/api-client.ts
const API_BASE = process.env.VITE_API_URL || 'http://localhost:8000'
```

---

### ❌ "Response parsing error"

**Sintomas**:
```
SyntaxError: Unexpected token '<' in JSON
Failed to parse response JSON
```

**Causa**: Backend retornando HTML em vez de JSON

**Soluções**:

1. Verificar erro no backend:
```bash
curl http://localhost:8000/health
```

2. Se retorna HTML error page, backend crashou
3. Verificar logs do backend
4. Reiniciar backend

---

## Docker Issues

### ❌ "Docker build fails"

**Sintomas**:
```
ERROR: failed to solve with frontend dockerfile.v0
```

**Soluções**:

1. Verificar Dockerfile:
```bash
docker build -t test .  # com mensagens de erro
```

2. Limpar cache:
```bash
docker system prune -a
docker builder prune
```

3. Rebuild sem cache:
```bash
docker-compose build --no-cache
```

---

### ❌ "Port already in use (Docker)"

**Sintomas**:
```
Error response from daemon: Ports are not available: listen tcp
```

**Soluções**:

1. Verificar containers rodando:
```bash
docker ps
docker-compose ps
```

2. Parar containers:
```bash
docker-compose down
```

3. Liberar porta manualmente:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

4. Ou usar portas diferentes:
```yaml
# docker-compose.yml
services:
  frontend:
    ports:
      - "5174:5173"
  backend:
    ports:
      - "8001:8000"
```

---

## Deployment Issues

### ❌ "GitHub Actions workflow fails"

**Sintomas**:
```
Workflow run failed
See logs for details
```

**Verificar**:

1. GitHub Actions → seu workflow → Logs
2. Procure por "error:" nas mensagens
3. Causas comuns:
   - Secrets não configuradas
   - Python/Node versão incompatível
   - Dependências faltando

**Soluções**:

```bash
# Localmente, simulate workflow:
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
npm install --legacy-peer-deps
npm run build
npm run lint
```

---

### ❌ "Azure deployment hangs"

**Sintomas**:
```
Deployment running for > 30 minutes
No output
```

**Soluções**:

1. Cancelar e restart
2. Verificar logs: Azure Portal → App Service → Log stream
3. Verificar Docker build localmente:
```bash
docker build -t test -f Dockerfile.backend .
```

---

## Performance Issues

### ❌ "Slow frontend build"

**Sintomas**:
```
npm run build takes > 1 minute
```

**Verificar**:
```bash
npm run build -- --profile
```

**Otimizações**:

1. Lazy load components:
```typescript
import { lazy, Suspense } from 'react';

const Report = lazy(() => import('@pages/ReportDetail'));

// Use:
<Suspense fallback={<Loading />}>
  <Report />
</Suspense>
```

2. Remover imports desnecessários
3. Verificar bundle size:
```bash
npm install -D webpack-bundle-analyzer
```

---

### ❌ "Slow API responses"

**Sintomas**:
```
API takes 5+ seconds
/api/analyze endpoint slow
```

**Verificar**:

```python
import time
import logging

logger = logging.getLogger(__name__)

@router.post("/analyze")
async def analyze(doc_id: str):
    start = time.time()
    result = await groq_service.analyze(doc_id)
    duration = time.time() - start
    logger.info(f"Analyze took {duration:.2f}s")
    return result
```

**Otimizações**:

1. Cache respostas
2. Usar async/await corretamente
3. Otimizar Groq API call
4. Indexar database queries

---

## 📊 Checklist de Troubleshooting

- [ ] Ativar virtual environment
- [ ] Instalar dependências
- [ ] Verificar arquivos de configuração (.env)
- [ ] Testar imports Python: `python -m py_compile`
- [ ] Verificar build frontend: `npm run build`
- [ ] Rodar lint: `npm run lint`
- [ ] Testar backend locale: `curl http://localhost:8000/health`
- [ ] Verificar logs (console output)
- [ ] Deletar node_modules + database se tudo falhar
- [ ] Reiniciar computador como último recurso

---

**Last Updated**: May 2026  
**Status**: Troubleshooting Guide ✅
