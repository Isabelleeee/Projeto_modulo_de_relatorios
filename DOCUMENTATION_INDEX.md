# 📚 Project Documentation Index

**Documentação completa do projeto para profissionais de engenharia de software**

---

## 🎯 Bem-vindo!

Este projeto contém toda a documentação técnica necessária para qualquer engenheiro de software trabalhar no projeto, fazer mudanças, refatorações, deploys, etc.

A documentação está dividida em **4 documentos principais**, cada um focado em um aspecto específico:

---

## 📖 Documentos Disponíveis

### 1️⃣ [ENGINEERING_HANDBOOK.md](ENGINEERING_HANDBOOK.md)
**O guia técnico completo do projeto**

**Conteúdo:**
- ✅ Visão geral do projeto
- ✅ Stack tecnológico completo (frontend, backend, DevOps)
- ✅ Arquitetura detalhada com diagramas
- ✅ Setup completo do ambiente
- ✅ Estrutura de pastas explicada
- ✅ Documentação de todos os endpoints API
- ✅ Padrões de código (TypeScript, Python, imports)
- ✅ Fluxo de deployment (local, Docker, Azure)
- ✅ Troubleshooting detalhado
- ✅ Referência de comandos
- ✅ Checklist pré-deployment

**Para ler quando:**
- Começar a trabalhar no projeto
- Entender a arquitetura geral
- Criar novas features
- Preparar deployment

**Tempo de leitura:** 30-45 minutos

---

### 2️⃣ [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
**Guia rápido para consultas durante desenvolvimento**

**Conteúdo:**
- ⚡ Quick start setup
- ⚡ Mapa rápido de arquivos
- ⚡ Tarefas comuns (add component, add endpoint, etc)
- ⚡ Exemplos de código prontos
- ⚡ Debug mode
- ⚡ Checklist pré-commit
- ⚡ Referência de endpoints
- ⚡ Emergency fixes
- ⚡ Templates de novos arquivos

**Para ler quando:**
- Precisar de uma resposta rápida
- Implementar feature nova
- Fazer debug rápido
- Antes de commitar código

**Tempo de leitura:** 5-10 minutos (de referência)

---

### 3️⃣ [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
**Guia de resolução de problemas comuns**

**Conteúdo:**
- 🔧 Setup issues (Python, npm, venv)
- 🔧 Frontend issues (ESLint, imports, CORS, build errors)
- 🔧 Backend issues (modules, database, ports)
- 🔧 API issues (upload, endpoints, responses)
- 🔧 Docker issues (build, ports)
- 🔧 Deployment issues
- 🔧 Performance issues
- 🔧 Emergency fixes & checklist

**Para ler quando:**
- Encontrar um erro
- Projeto não está funcionando
- Receber mensagem de erro desconhecida
- Performance ou comportamento estranho

**Tempo de leitura:** 2-5 minutos (por problema)

---

### 4️⃣ [Este documento]
**Índice e porta de entrada da documentação**

---

## 🚀 Quick Start para Novo Profissional

Se você é novo no projeto, siga este roteiro:

### Dia 1: Entender o Projeto
```
1. Ler "Visão Geral do Projeto" em ENGINEERING_HANDBOOK.md
2. Ler "Stack Tecnológico" em ENGINEERING_HANDBOOK.md
3. Ler "Arquitetura do Projeto" em ENGINEERING_HANDBOOK.md
4. Ler "Estrutura de Pastas" em ENGINEERING_HANDBOOK.md
```
⏱️ ~20 minutos

### Dia 2: Setup & Desenvolvimento
```
1. Seguir "Setup do Ambiente" em ENGINEERING_HANDBOOK.md
2. Executar todos os comandos
3. Guardar QUICK_REFERENCE.md para consulta
4. Testar desenvolvimento local
```
⏱️ ~30 minutos

### Dia 3+: Trabalhar no Projeto
```
1. Usar QUICK_REFERENCE.md para tarefas rápidas
2. Usar TROUBLESHOOTING.md se encontrar problemas
3. Consultar ENGINEERING_HANDBOOK.md para detalhes
4. Referência de API para integrar
```

---

## 🎓 Guias por Caso de Uso

### Scenario: "Quero adicionar um novo formulário no frontend"
```
→ QUICK_REFERENCE.md → "Add Frontend Component"
→ ENGINEERING_HANDBOOK.md → "Padrões de Código - Frontend"
→ Testar: npm run lint && npm run build
```

### Scenario: "Quero criar um novo endpoint no backend"
```
→ QUICK_REFERENCE.md → "Add Backend Endpoint"
→ ENGINEERING_HANDBOOK.md → "APIs e Endpoints"
→ ENGINEERING_HANDBOOK.md → "Padrões de Código - Backend"
→ Testar no Postman/curl
```

### Scenario: "Estou recebendo erro CORS"
```
→ TROUBLESHOOTING.md → Search "CORS Error"
→ Siga a solução específica
→ Se não resolver: ENGINEERING_HANDBOOK.md → "Setup do Ambiente"
```

### Scenario: "Quero fazer deploy em produção"
```
→ ENGINEERING_HANDBOOK.md → "Checklist de Pre-Deployment"
→ ENGINEERING_HANDBOOK.md → "Fluxo de Deployment"
→ TROUBLESHOOTING.md → "Deployment Issues"
→ Push para main branch
```

### Scenario: "Projeto não está buildando"
```
→ TROUBLESHOOTING.md → Find your error
→ Siga a solução
→ Se não resolver: QUICK_REFERENCE.md → "Emergency Fixes"
```

### Scenario: "Quero refatorar o código"
```
→ ENGINEERING_HANDBOOK.md → "Padrões de Código"
→ ENGINEERING_HANDBOOK.md → "Estrutura de Pastas"
→ ENGINEERING_HANDBOOK.md → "Arquitetura do Projeto"
→ QUICK_REFERENCE.md → "Pre-Commit Checklist"
```

---

## 📋 Informações Rápidas

### Tech Stack
| Aspecto | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend Framework | React | 18.3.1 |
| Type Safety | TypeScript | 6.0.3 |
| Build Tool | Vite | 6.3.5 |
| CSS | Tailwind | 4.1.12 |
| Backend Framework | FastAPI | Latest |
| Backend Language | Python | 3.10+ |
| Database | SQLite | Latest |
| AI Integration | Groq API | Latest |

### Principais Pastas
```
src/               → Frontend React code
backend/app/       → Backend application logic
backend/core/      → Backend config & database
backend/uploads/   → User uploaded files
```

### Principais Comandos
```bash
# Development
npm run dev                                    # Frontend dev server
python -m uvicorn backend.main:app --reload   # Backend dev server

# Quality
npm run lint                                   # Check frontend
npm run format                                 # Format frontend
python -m py_compile backend/**/*.py          # Check backend syntax

# Build
npm run build                                  # Production build
docker-compose build                          # Docker build

# Deploy
git push origin main                          # Trigger GitHub Actions
```

### Frontend Routes
- `/` → Home page (upload & reports)
- `/reports` → Reports list
- `/reports/:id` → Report details
- `/settings` → Settings page

### Backend Endpoints
```
POST   /api/documents/upload              # Upload file
POST   /api/documents/analyze             # Analyze document
GET    /api/documents/list                # List documents
GET    /api/documents/download/{id}       # Download report
DELETE /api/documents/{id}                # Delete document
GET    /health                            # Health check
```

---

## 🔑 Key Concepts

### Frontend Architecture
- **Barrel Imports**: `src/lib/` exports centralized APIs
- **Feature Modules**: `src/features/` for feature-specific logic
- **Path Aliases**: `@components`, `@pages`, `@lib` for clean imports
- **Custom Hooks**: `useApi()` for all API calls
- **TypeScript First**: No `any` types, strict mode enabled

### Backend Architecture
- **Hierarchical**: `backend/app/` (logic) + `backend/core/` (config)
- **Re-exports**: `backend/*.py` files re-export from app/core for compatibility
- **Dependency Injection**: FastAPI `Depends()` for database sessions
- **Validation**: Pydantic schemas for all inputs
- **Error Handling**: Custom HTTPException for API errors

### Database
- **ORM**: SQLAlchemy for type-safe queries
- **Database**: SQLite for local development
- **Migrations**: Alembic for schema versioning (if needed)

### Deployment
- **Docker**: Containerized frontend & backend
- **GitHub Actions**: CI/CD pipeline
- **Azure**: Cloud hosting with App Service

---

## 🤝 Contributing Guidelines

### Code Quality
- [ ] Run `npm run lint` - must pass
- [ ] Run `npm run format` - auto-format code
- [ ] Run `npm run build` - must succeed
- [ ] No `console.log()` in production code
- [ ] No `any` types in TypeScript
- [ ] All Python files compile: `python -m py_compile`

### Commit Process
1. Create feature branch
2. Make changes
3. Follow pre-commit checklist (see QUICK_REFERENCE.md)
4. Commit with clear message
5. Push to remote
6. Create Pull Request
7. Pass CI/CD checks

### PR Description Template
```markdown
## Description
What does this PR do?

## Changes
- Change 1
- Change 2

## Testing
How was this tested?

## Checklist
- [ ] Tests pass
- [ ] Lint passes
- [ ] Build succeeds
- [ ] No breaking changes
```

---

## 📞 Getting Help

### For Specific Errors
→ Search in **TROUBLESHOOTING.md**

### For How-To Questions
→ Check **QUICK_REFERENCE.md**

### For Architecture Questions
→ Read **ENGINEERING_HANDBOOK.md**

### If Still Stuck
1. Check all 3 documents
2. Review project README.md
3. Check inline code comments
4. Review test files for examples

---

## 📚 Additional Resources

### Internal Documentation
- [README.md](README.md) - Project overview
- [backend/README.md](backend/README.md) - Backend setup
- [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md) - Azure deployment guide
- [guidelines/Guidelines.md](guidelines/Guidelines.md) - Project guidelines

### External Resources
- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

---

## 🗂️ File Structure Reference

```
📦 Project Root
├── 📄 README.md                        Project overview
├── 📄 ENGINEERING_HANDBOOK.md          ← Complete technical guide
├── 📄 QUICK_REFERENCE.md               ← Quick consultations
├── 📄 TROUBLESHOOTING.md               ← Problem solving
├── 📄 DOCUMENTATION_INDEX.md           ← This file
│
├── 📁 frontend code
├── src/                                React frontend
│   ├── lib/                            Utilities & API client
│   ├── features/                       Feature modules
│   ├── hooks/                          Custom React hooks
│   ├── app/                            Main app structure
│   └── styles/                         CSS files
│
├── 📁 backend code
├── backend/
│   ├── app/                            Application logic
│   │   ├── routes/                     API endpoints
│   │   ├── services/                   Business logic
│   │   ├── models/                     Database models
│   │   └── schemas/                    API schemas
│   ├── core/                           Core config
│   │   ├── config.py                   Settings
│   │   └── database.py                 Database setup
│   ├── requirements.txt                Python dependencies
│   └── .env                            Environment variables
│
├── 📁 config files
├── vite.config.ts                      Frontend build config
├── package.json                        Frontend dependencies
├── docker-compose.yml                  Docker setup
├── .github/workflows/                  CI/CD pipeline
│
└── 📁 documentation
    ├── guidelines/                     Project guidelines
    ├── AZURE_DEPLOYMENT.md             Azure deployment
    └── ATTRIBUTIONS.md                 Credits & attributions
```

---

## ✅ Documentation Maintenance

**Last Updated**: May 2026  
**Maintained By**: Engineering Team  
**Version**: 1.0  
**Status**: ✅ Production Ready

### When to Update Documentation
- After significant architecture changes
- When adding new dependencies
- When changing deployment process
- When fixing major bugs (document solution in TROUBLESHOOTING.md)
- When adding new endpoints or features

---

## 🎯 Key Takeaways

✅ **Use ENGINEERING_HANDBOOK.md** for comprehensive technical understanding  
✅ **Use QUICK_REFERENCE.md** for quick lookups during development  
✅ **Use TROUBLESHOOTING.md** when you encounter errors  
✅ **Follow the pre-deployment checklist** before pushing to production  
✅ **Keep documentation updated** as the project evolves  
✅ **Ask questions** - better to clarify than to guess  

---

**Happy Coding! 🚀**

*This documentation is designed to empower any software engineer to contribute to this project effectively.*
