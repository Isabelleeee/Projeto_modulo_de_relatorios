# 🎓 Developer Onboarding Guide

**Guia completo para integração de novo desenvolvedor no projeto**

---

## 👋 Bem-vindo ao Time!

Este guia irá ajudar você a se integrar ao projeto em poucas horas. Siga os passos na ordem recomendada.

**Tempo total estimado**: 4-6 horas (incluindo setup)

---

## 📋 Pré-requisitos

Certifique-se que você tem:

- [ ] **Git**: `git --version` deve retornar versão
- [ ] **Node.js 18+**: `node --version` deve retornar 18.x ou superior
- [ ] **npm 9+**: `npm --version`
- [ ] **Python 3.10+**: `python --version` ou `python3 --version`
- [ ] **VS Code** (recomendado) ou seu editor preferido
- [ ] **Git credentials** configuradas no computador
- [ ] **Acesso ao repositório** (GitHub)

Se algum estiver faltando, instale antes de prosseguir.

---

## 🚀 Fase 1: Onboarding Inicial (30 minutos)

### 1.1 Clone o Repositório

```bash
git clone https://github.com/seu-usuario/Protótipo-Projeto-Eng_soft.git
cd "Protótipo Projeto Eng_soft"
```

### 1.2 Leia DOCUMENTATION_INDEX.md

**Tempo**: 10 minutos

```bash
# Abra e leia:
DOCUMENTATION_INDEX.md
```

Este arquivo é a porta de entrada para toda a documentação.

### 1.3 Entenda o Projeto

**Tempo**: 20 minutos

Leia estas seções:

1. `ENGINEERING_HANDBOOK.md` → **Visão Geral do Projeto**
2. `ENGINEERING_HANDBOOK.md` → **Stack Tecnológico**
3. `ARCHITECTURE_DECISIONS.md` → Primeiras 3 ADRs

**Objetivo**: Entender o que o projeto faz e com qual tecnologia.

### ✅ Checklist Fase 1
- [ ] Repositório clonado
- [ ] Documentação Index lida
- [ ] Visão geral compreendida
- [ ] Stack entendido

---

## 🔧 Fase 2: Setup Local (90 minutos)

### 2.1 Setup Backend

**Tempo**: 30 minutos

```bash
# 1. Crie virtual environment
python -m venv .venv

# 2. Ative venv
# Windows (PowerShell):
.venv\Scripts\Activate.ps1

# macOS/Linux:
source .venv/bin/activate

# 3. Instale dependências
pip install -r backend/requirements.txt

# 4. Configure variáveis de ambiente
cd backend
cat > .env << EOF
GROQ_API_KEY=seu_groq_api_key_aqui
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
EOF

# 5. Volte para raiz
cd ..

# 6. Teste imports
python -c "from backend.app.main import app; print('✓ Backend OK')"
```

**Se houver erro**, consulte `TROUBLESHOOTING.md` → "Backend Issues"

### 2.2 Setup Frontend

**Tempo**: 20 minutos

```bash
# 1. Instale dependências
npm install --legacy-peer-deps

# 2. Verifique build
npm run build

# 3. Verifique lint
npm run lint
```

**Se houver erro**, consulte `TROUBLESHOOTING.md` → "Frontend Issues"

### 2.3 Teste Ambiente Local

**Tempo**: 40 minutos

```bash
# Terminal 1: Backend (manter aberto)
cd backend
python -m uvicorn main:app --reload

# Terminal 2: Frontend (novo terminal, manter aberto)
npm run dev

# Terminal 3: Testes
# Espere 10 segundos para ambos iniciarem

# Health check backend
curl http://localhost:8000/health

# Abra frontend no navegador
# http://localhost:5173

# Teste upload de arquivo
# 1. Clique em "Upload"
# 2. Selecione um arquivo PDF ou Markdown
# 3. Deve aparecer na lista de documentos
```

**Esperado**:
- ✅ Backend rodando em http://localhost:8000
- ✅ Frontend rodando em http://localhost:5173
- ✅ Health check retorna JSON
- ✅ Interface funciona e permite upload

**Se houver problema**, leia `TROUBLESHOOTING.md`

### ✅ Checklist Fase 2
- [ ] Virtual environment criado e ativado
- [ ] Backend dependências instaladas
- [ ] .env backend configurado
- [ ] Backend imports validados
- [ ] Frontend dependências instaladas
- [ ] npm build sucedido
- [ ] npm lint sucedido
- [ ] Backend servidor rodando
- [ ] Frontend servidor rodando
- [ ] Health check OK
- [ ] Frontend carrega em navegador
- [ ] Upload funciona

---

## 📚 Fase 3: Aprendizado (60 minutos)

### 3.1 Estrutura do Projeto

**Tempo**: 15 minutos

Leia `ENGINEERING_HANDBOOK.md`:
- Estrutura de Pastas - Frontend
- Estrutura de Pastas - Backend
- Fluxo de Dados

**Objetivo**: Saber onde procurar por arquivo específico.

### 3.2 Arquitetura

**Tempo**: 15 minutos

Leia `ENGINEERING_HANDBOOK.md`:
- Arquitetura Geral (diagramas)
- Frontend Architecture
- Backend Architecture

**Objetivo**: Entender como componentes conversam.

### 3.3 APIs & Endpoints

**Tempo**: 15 minutos

Leia `ENGINEERING_HANDBOOK.md`:
- APIs e Endpoints (seção completa)

**Objetivo**: Conhecer endpoints disponíveis e como usá-los.

### 3.4 Padrões de Código

**Tempo**: 15 minutos

Leia `ENGINEERING_HANDBOOK.md`:
- Padrões de Código (Frontend Best Practices)
- Padrões de Código (Backend Best Practices)

**Objetivo**: Saber como código é estruturado no projeto.

### ✅ Checklist Fase 3
- [ ] Estrutura de pastas compreendida
- [ ] Arquitetura entendida
- [ ] Endpoints conhecidos
- [ ] Padrões de código revisados

---

## 🛠️ Fase 4: Primeira Tarefa (60 minutos)

### 4.1 Escolha uma Tarefa Simples

Procure por issue com label `good-first-issue` ou `beginner` no GitHub.

**Exemplo de tarefas boas para começar**:
- [ ] Adicionar novo campo a formulário
- [ ] Criar novo página simples
- [ ] Adicionar novo endpoint com lógica simples
- [ ] Corrigir erro na interface
- [ ] Melhorar documentação

### 4.2 Crie uma Branch

```bash
git checkout -b feature/sua-tarefa
# ou
git checkout -b fix/seu-bug
```

### 4.3 Implemente a Mudança

**Frontend**:
1. Abra `QUICK_REFERENCE.md` → "Add Frontend Component"
2. Siga o template
3. Teste no navegador
4. Rode `npm run lint && npm run format`

**Backend**:
1. Abra `QUICK_REFERENCE.md` → "Add Backend Endpoint"
2. Siga o template
3. Teste com curl ou Postman
4. Rode `python -m py_compile backend/**/*.py`

### 4.4 Teste Mudanças

```bash
# Frontend
npm run build
npm run lint

# Backend
python -m py_compile backend/**/*.py
# Testar manualmente no servidor rodando
```

### 4.5 Commit & Push

```bash
# Verifique o que mudou
git status

# Adicione mudanças
git add .

# Commit com mensagem clara
git commit -m "feat: adicione nova feature XYZ"
# ou
git commit -m "fix: corrija bug em XYZ"

# Push para sua branch
git push origin feature/sua-tarefa
```

### 4.6 Abra Pull Request

1. Vá para GitHub
2. Clique "Compare & pull request"
3. Descreva mudanças
4. Peça review

### ✅ Checklist Fase 4
- [ ] Tarefa escolhida e entendida
- [ ] Branch criada
- [ ] Mudanças implementadas
- [ ] Código testado localmente
- [ ] Lint passou
- [ ] Build passou
- [ ] Commit feito com boa mensagem
- [ ] PR aberta

---

## 📖 Fase 5: Recursos & Próximos Passos (30 minutos)

### 5.1 Documente Aprendizados

Crie arquivo `.md` pessoal com:
- Problemas encontrados
- Soluções descobertas
- Atalhos úteis
- Questões para time

Exemplo:
```markdown
# Meus Aprendizados - [Seu Nome]

## Problemas & Soluções
- [Problema]: Solução

## Atalhos Úteis
- npm run dev // Inicia frontend
```

### 5.2 Marque as Seções Importantes

Bookmark ou mark importantes:
- `QUICK_REFERENCE.md` - seu melhor amigo
- `TROUBLESHOOTING.md` - quando der erro
- `ENGINEERING_HANDBOOK.md` - quando precisar entender

### 5.3 Pergunte ao Time

Se bloquear ou tiver dúvidas:
1. **Verificar documentação** - 5 min
2. **Google/Stack Overflow** - 10 min  
3. **Perguntar ao time** - sempre bem-vindo!

**Dica**: Faça perguntas específicas, não genéricas:
- ❌ "Como adicionar um componente?"
- ✅ "No template de component em QUICK_REFERENCE, como faço para passar state para child component?"

### 5.4 Daily Habits

Desenvolva esses hábitos:

```bash
# Antes de qualquer trabalho
git pull origin main

# Durante desenvolvimento
npm run lint          # Frontend
npm run format        # Frontend
python -m py_compile  # Backend

# Antes de push
npm run build         # Frontend
python -m uvicorn ... # Backend test

# Antes de merge
git push origin seu-branch
Abrir PR
```

### 5.5 Estude o Projeto

**Primeira semana:**
- Ler todos os ADRs completamente
- Estudar cada página/endpoint
- Entender o fluxo de dados completo

**Segunda semana:**
- Fazer 2-3 PRs pequenas
- Revisar PRs de colegas
- Questionar design decisions

**Terceira semana:**
- Feature maior
- Documentação improvement
- Mentoring a outro dev

### ✅ Checklist Fase 5
- [ ] Aprendizados documentados
- [ ] Bookmarks criados
- [ ] Hábitos diários entendidos
- [ ] Plano de estudo definido

---

## 🎯 Primeira Semana - Plano Sugerido

| Dia | Atividade | Tempo |
|-----|-----------|-------|
| Seg | Fases 1-2 (setup) | 2h |
| Seg PM | Fase 3 (learning) | 1h |
| Ter | Primeira tarefa | 3h |
| Ter PM | Review PR & questions | 1h |
| Qua | Outra tarefa | 3h |
| Qua PM | Documentação | 1h |
| Qui | Tarefa maior | 4h |
| Qui PM | PR review & setup | 1h |
| Sex | Estudar ADRs + code | 3h |
| Sex PM | Documentação & planejamento | 1h |

---

## ❓ FAQ - Onboarding

### "Estou recebendo erro no setup"
→ Consulte `TROUBLESHOOTING.md` → Find your error

### "Não entendo a arquitetura"
→ Leia `ARCHITECTURE_DECISIONS.md` → Comece pelas primeiras 5 ADRs

### "Por onde começo a codificar?"
→ Segue `QUICK_REFERENCE.md` e escolha seu tipo de tarefa

### "Como faço deploy?"
→ Leia `ENGINEERING_HANDBOOK.md` → "Fluxo de Deployment"

### "Quando usar qual documento?"
→ Consulte `DOCUMENTATION_INDEX.md` → "Guias por Caso de Uso"

### "Preciso refatorar algo"
→ Leia `ENGINEERING_HANDBOOK.md` → "Padrões de Código"

### "O projeto não tá funcionando"
→ Leia `TROUBLESHOOTING.md` completamente

### "Como funciona GitHub Actions?"
→ Leia `.github/workflows/deploy.yml`
→ Artigos: "GitHub Actions for Beginners"

---

## 💡 Pro Tips para Novo Dev

1. **Rode tudo localmente primeiro** - não dependa de staging
2. **Leia code existente** - bom jeito de aprender padrões
3. **Pergunte sobre decisions** - entenda o porquê
4. **Revise código de colegas** - aprenda com experiência deles
5. **Documente enquanto aprende** - ajuda outros depois
6. **Não tenha medo de quebrar** - é ambiente local
7. **Teste edge cases** - upload vazio, arquivo grande, etc
8. **Verifique logs** - logs dizem muito sobre problemas
9. **Use DevTools** - inspecione elementos, network, console
10. **Comunique bloqueios** - melhor pedir ajuda cedo

---

## 🔗 Links & Atalhos

### Documentação Interna
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Porta de entrada
- [ENGINEERING_HANDBOOK.md](ENGINEERING_HANDBOOK.md) - Guia técnico
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Referência rápida
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problemas & soluções
- [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) - Decisões técnicas
- [README.md](README.md) - Overview do projeto
- [backend/README.md](backend/README.md) - Backend específico

### Documentação Externa
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Ferramentas Úteis
- [VS Code Extensions](https://marketplace.visualstudio.com/) - ESLint, Prettier, Thunder Client
- [Postman](https://www.postman.com/) - Testar APIs
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debug frontend

---

## 📞 Precisa de Help?

**Encontrou um problema?**
1. Procure em `TROUBLESHOOTING.md`
2. Google it
3. Pergunte ao time no chat
4. Open issue no GitHub

**Não entendeu algo?**
1. Releia a documentação
2. Consulte ENGINEERING_HANDBOOK.md
3. Procure por código exemplo
4. Pergunte ao time

**Quer contribuir melhor?**
1. Leia `ARCHITECTURE_DECISIONS.md`
2. Siga `ENGINEERING_HANDBOOK.md` → "Padrões de Código"
3. Use `QUICK_REFERENCE.md` como template
4. Rode `QUICK_REFERENCE.md` → "Pre-Commit Checklist"

---

## 🎓 Aprendizado Contínuo

Após primeira semana, continue:

### Leituras Recomendadas
- [ ] Clean Code - Robert Martin
- [ ] Refactoring - Martin Fowler
- [ ] The Pragmatic Programmer
- [ ] System Design Interview

### Prática
- [ ] Implemente 1 feature nova por semana
- [ ] Revise código de colegas regularmente
- [ ] Estude PRs de colegas experientes
- [ ] Refatore código quando apropriado

### Comunidade
- [ ] Acompanhe issues no GitHub
- [ ] Participe de design discussions
- [ ] Compartilhe learnings com time
- [ ] Mentor outros devs

---

## ✅ Conclusão do Onboarding

Você completou onboarding quando pode:

- ✅ Rodar projeto completo localmente
- ✅ Entender arquitetura geral
- ✅ Fazer uma feature simples do início ao fim
- ✅ Revisar código de colegas
- ✅ Debugar problemas básicos
- ✅ Saber onde procurar informações
- ✅ Contribuir para documentação

**Parabéns por estar aqui! 🎉**

Você agora está pronto para contribuir de forma efectiva ao projeto.

---

**Last Updated**: May 2026  
**Version**: 1.0  
**Bem-vindo ao time!** 🚀
