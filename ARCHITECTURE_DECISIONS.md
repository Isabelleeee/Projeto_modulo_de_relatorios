# 📋 Architecture Decision Records (ADR)

**Decisões técnicas importantes tomadas no projeto e suas justificativas**

---

## 🎯 O que é ADR?

Architecture Decision Records (ADRs) são documentos que registram decisões arquiteturais importantes, suas justificativas, contexto, alternativas consideradas, e consequências. Isso ajuda engenheiros futuros a entender **o porquê** das decisões técnicas.

---

## 📝 ADRs do Projeto

### ADR-001: Backend em FastAPI + Python

**Status**: ✅ Aceito  
**Data**: Maio 2026  
**Proposto por**: Engineering Team  

#### Contexto
Precisava de framework backend para API REST que pudesse integrar com Groq AI, processar uploads de arquivo, e gerar relatórios.

#### Decisão
Usar **FastAPI** com **Python 3.10+** para backend.

#### Justificativa
✅ **Vantagens**:
- FastAPI é moderno e altamente performático
- Documentação automática (Swagger)
- Type hints nativas com Pydantic para validação
- Excelente suporte a async/await
- Grande ecossistema de bibliotecas Python
- Groq API tem cliente Python maduro
- SQLAlchemy bem documentado para ORM
- Fácil de debugar e testar

❌ **Alternativas rejeitadas**:
- Node.js/Express: Python melhor para processamento de IA
- Django: Muito pesado para API pura
- Go: Menos suporte a IA/ML

#### Consequências
- ✅ Desenvolvimento rápido e seguro
- ✅ Type safety com Pydantic
- ✅ Fácil integração com Groq
- ⚠️ Requer Python environment setup
- ⚠️ Deploy em Azure precisa de Python support

---

### ADR-002: Frontend em React 18 + TypeScript

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Precisava de frontend responsivo que suportasse upload drag-drop, visualização de relatórios, e animações suaves.

#### Decisão
Usar **React 18.3.1** com **TypeScript 6** e **Vite** como build tool.

#### Justificativa
✅ **Vantagens**:
- React é o padrão da indústria
- TypeScript garante type safety
- Vite é mais rápido que Webpack
- Ecossistema maduro (routing, forms, UI)
- Suporte a hooks e functional components
- Performance otimizada com code splitting

❌ **Alternativas rejeitadas**:
- Vue.js: Menos jobs no mercado
- Angular: Muito complexo para escopo
- Svelte: Ecossistema menor

#### Consequências
- ✅ Fácil encontrar desenvolvedores React
- ✅ Muitas bibliotecas disponíveis
- ✅ Bom performance e DX
- ⚠️ Bundle size pode ser grande
- ⚠️ Curva de aprendizado para iniciantes

---

### ADR-003: Tailwind CSS para Styling

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Precisava de forma rápida e consistente de estilizar componentes sem escrever muito CSS custom.

#### Decisão
Usar **Tailwind CSS 4.1** com utility-first approach.

#### Justificativa
✅ **Vantagens**:
- Utility-first: rápido para prototipagem
- Consistência automática com design system
- Purge CSS remove estilos não usados
- Grande comunidade e plugins
- Responsividade built-in
- Integração perfeita com React

❌ **Alternativas rejeitadas**:
- CSS Modules: Mais verboso
- Styled-components: Menos performance
- Material-UI: Muito pesado

#### Consequências
- ✅ Build rápido
- ✅ Bundle size menor (com purge)
- ✅ Desenvolvimento ágil
- ⚠️ HTML fica verboso com muitas classes
- ⚠️ Curva de aprendizado para quem nunca usou

---

### ADR-004: SQLite para Banco de Dados Local

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Precisava de banco de dados para armazenar documentos e análises localmente para desenvolvimento e teste.

#### Decisão
Usar **SQLite** para desenvolvimento local, pronto para migrar a PostgreSQL em produção.

#### Justificativa
✅ **Vantagens**:
- Zero setup - arquivo único
- Perfeito para desenvolvimento
- Rápido para prototipar
- Sem dependências externas
- Fácil backup (copiar arquivo)

❌ **Alternativas rejeitadas**:
- PostgreSQL: Complexo para local dev
- MongoDB: Não precisa de NoSQL
- Firebase: Preferir controle local

#### Consequências
- ✅ Setup imediato
- ✅ Fácil para testes
- ⚠️ Não suporta concorrência alta
- ⚠️ Precisa migrar para PostgreSQL em produção
- ⚠️ Não suporta múltiplas réplicas

**Nota**: Para produção em Azure, recomenda-se usar **Azure SQL Database** ou **PostgreSQL**.

---

### ADR-005: Backend Hierarchical Structure (app/ + core/)

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Backend começou com estrutura plana que ficou desorganizada com crescimento do código.

#### Decisão
Reorganizar backend em dois diretórios:
- `backend/app/` - Lógica da aplicação (routes, services, models)
- `backend/core/` - Configuração e setup (config, database)

#### Justificativa
✅ **Vantagens**:
- Separação clara de responsabilidades
- Fácil navegar e encontrar código
- Config centralizada em `core/`
- Escalável para novos módulos
- Re-exports em `backend/*.py` mantém backward compatibility

❌ **Alternativas rejeitadas**:
- Manter estrutura plana: Fica desorganizado com crescimento
- Usar apenas app/: Perde separação de concerns

#### Consequências
- ✅ Código organizado
- ✅ Fácil para novatos navegarem
- ✅ Escalável
- ⚠️ Requer re-exports para imports antigos
- ⚠️ Mais pastas para navegar

---

### ADR-006: Frontend Feature-Based Organization

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Frontend tinha componentes espalhados em `components/`, dificultando localização de código específico de feature.

#### Decisão
Criar `src/features/` para agrupar código relacionado:
```
src/features/
  └── documents/
      ├── document-service.ts
      ├── useDocument.ts
      └── types.ts
```

#### Justificativa
✅ **Vantagens**:
- Colocalização: código relacionado junto
- Escalável: fácil adicionar novas features
- Independência: features podem ser independentes
- Fácil encontrar código relacionado

❌ **Alternativas rejeitadas**:
- Tudo em components/: Desorganizado
- Separação por tipo (services/, hooks/): Fragmenta feature logic

#### Consequências
- ✅ Fácil adicionar features
- ✅ Código relacionado junto
- ✅ Melhor organização
- ⚠️ Requer disciplina de organização

---

### ADR-007: Barrel Exports em src/lib/

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Imports espalhados faziam código difícil de manter e refatorar.

#### Decisão
Criar barrel files em `src/lib/` que exportam APIs centralizadas:
```typescript
// src/lib/index.ts
export * from './api-client'
export * from './utils'
```

#### Justificativa
✅ **Vantagens**:
- Imports limpos: `import { apiClient } from '@lib'`
- Refactoring fácil: muda uma vez em barrel
- API clara: `@lib` expõe APIs públicas
- Encapsulamento: internals não expostos

❌ **Alternativas rejeitadas**:
- Imports diretos: Longo e frágil
- Não usar barrels: Desorganizado

#### Consequências
- ✅ Imports limpos
- ✅ Refactoring seguro
- ✅ Melhor encapsulamento
- ⚠️ Requer manutenção de barrel file

---

### ADR-008: TypeScript com Strict Mode

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Código TypeScript tinha `any` types e type errors não eram adequadamente tratados.

#### Decisão
Ativar TypeScript strict mode em `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

#### Justificativa
✅ **Vantagens**:
- Mais bugs encontrados em compile time
- Melhor documentation via types
- IDE autocomplete melhor
- Refactoring seguro
- Menos runtime errors

❌ **Alternativas rejeitadas**:
- Permissive types: Menos segurança
- Sem types: JavaScript puro

#### Consequências
- ✅ Menos bugs em produção
- ✅ Melhor DX
- ✅ Código mais maintível
- ⚠️ Desenvolvimento mais lento inicialmente
- ⚠️ Curva de aprendizado para new devs

---

### ADR-009: Docker Compose para Local Development

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Setup local era manual e propenso a erros. Cada dev configurava diferente.

#### Decisão
Usar **Docker Compose** para orquestrar frontend + backend + volumes localmente.

#### Justificativa
✅ **Vantagens**:
- Environment consistente para todos devs
- Production-like setup local
- Fácil onboarding novo dev
- Simula Azure setup localmente
- Todos rodam mesmas versões

❌ **Alternativas rejeitadas**:
- Manual setup: Inconsistente
- Vagrant: Mais pesado que Docker

#### Consequências
- ✅ Onboarding rápido
- ✅ Ambiente previsível
- ✅ CI/CD mais confiável
- ⚠️ Requer Docker instalado
- ⚠️ Performance em Windows pode ser lenta

---

### ADR-010: GitHub Actions + Azure para CI/CD

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Precisava de pipeline automatizado para testar e fazer deploy de mudanças.

#### Decisão
Usar **GitHub Actions** para CI/CD e fazer deploy em **Azure App Service**.

#### Justificativa
✅ **Vantagens**:
- GitHub Actions integrado ao repo
- Sem custo extra (included em GitHub)
- Azure bem integrado com Actions
- Escalável e confiável
- Logs e history preservados

❌ **Alternativas rejeitadas**:
- GitLab CI: Diferente de GitHub
- Jenkins: Mais complexo de setup
- Travis CI: Mais caro

#### Consequências
- ✅ Deploy automatizado
- ✅ Menos manual work
- ✅ Melhor confiabilidade
- ⚠️ Requer setup Azure credentials
- ⚠️ GitHub Secrets precisam ser mantidas

---

### ADR-011: ESLint + Prettier para Code Quality

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Código tinha inconsistências de style e alguns anti-patterns.

#### Decisão
Usar **ESLint 8.57.1** para linting e **Prettier 3.8.3** para formatação.

#### Justificativa
✅ **Vantagens**:
- Consistency automática
- Previne bugs comuns
- Fácil onboarding (menos discussões sobre style)
- Integração com IDEs
- Pre-commit hooks possíveis

❌ **Alternativas rejeitadas**:
- Sem linting: Código inconsistente
- Só Prettier: Sem regras de melhores práticas

#### Consequências
- ✅ Código consistente
- ✅ Menos debates sobre style
- ✅ Melhor qualidade
- ⚠️ Precisa rodar npm run format
- ⚠️ Requer lint check em CI/CD

---

### ADR-012: Vite ao invés de Webpack

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Build de React era lento e desenvolvimento tinha latência visível.

#### Decisão
Usar **Vite 6.3.5** como build tool/dev server.

#### Justificativa
✅ **Vantagens**:
- Dev server **muito** mais rápido (HMR quase instantânea)
- Build otimizado com Rollup
- Suporte native a ES modules
- Configuração simples
- Excelente DX

❌ **Alternativas rejeitadas**:
- Webpack: Mais lento, mais complexo
- Parcel: Menos customização

#### Consequências
- ✅ Dev faster (HMR < 100ms)
- ✅ Build mais rápido
- ✅ Melhor DX
- ⚠️ Requer Node 14+ (já temos)
- ⚠️ Menos plugins que Webpack

---

### ADR-013: Pydantic para Validação Backend

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Backend precisava validar inputs de forma consistente e gerar erro messages claras.

#### Decisão
Usar **Pydantic** para definir e validar schemas de dados.

#### Justificativa
✅ **Vantagens**:
- Validação automática com type hints
- Error messages claras
- Serialização JSON automática
- Integração perfeita com FastAPI
- Type safety

❌ **Alternativas rejeitadas**:
- Manual validation: Tedioso e propenso a erros
- Marshmallow: Menos integrado com FastAPI

#### Consequências
- ✅ Validação automática
- ✅ Menos código boilerplate
- ✅ Error messages melhores
- ⚠️ Curva de aprendizado pequena
- ⚠️ Pode ser overkill para dados simples

---

### ADR-014: React Router v7 para Routing

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Precisava de routing robosto no frontend para múltiplas páginas.

#### Decisão
Usar **React Router v7.13.0** para client-side routing.

#### Justificativa
✅ **Vantagens**:
- Standard da indústria
- Integração com React
- Nested routes
- Data loading patterns
- Bem mantido

❌ **Alternativas rejeitadas**:
- TanStack Router: Mais novo
- Next.js: Overkill, não é SSR

#### Consequências
- ✅ Routing robust
- ✅ Fácil encontrar devs
- ✅ Boa documentação
- ⚠️ Requer aprendizado
- ⚠️ Bundle size extra

---

### ADR-015: Groq API para IA

**Status**: ✅ Aceito  
**Data**: Maio 2026  

#### Contexto
Precisava de IA para análise de documentos com bom custo/benefício.

#### Decisão
Usar **Groq API** com modelo Mixtral 8x7B.

#### Justificativa
✅ **Vantagens**:
- Rápido (IA acelerada por hardware)
- Bom modelo base (Mixtral)
- Preço razoável
- Easy integration (SDK Python)
- Boa uptime

❌ **Alternativas rejeitadas**:
- OpenAI GPT-4: Mais caro
- Local model: Mais lento

#### Consequências
- ✅ IA rápida e confiável
- ✅ Bom custo/benefício
- ✅ Fácil integração
- ⚠️ Dependência externa (API)
- ⚠️ Rate limits precisam ser respeitados

---

## 📊 Decision Matrix - Por que essas tech choices?

| Decisão | Trade-off | Benefício |
|---------|-----------|-----------|
| React | Bundle size | Produtividade dev |
| TypeScript | Setup time | Bug prevention |
| FastAPI | Python dependency | Type safety + AI libs |
| Tailwind | Verbosity | Speed to develop |
| SQLite local | Scale limited | Zero setup |
| Docker Compose | Complexity | Consistency |
| GitHub Actions | Lock-in | Cost savings |

---

## 🔄 Quando Revisitar Essas Decisões?

### ADR-001/002/003/004: Stack
**Revisitar quando:**
- Performance não atender requirements
- Custo de deploy aumentar muito
- Novo requirement (realtime, offline, etc)
- Melhor alternativa emergir

### ADR-005/006/007/008: Organization
**Revisitar quando:**
- Codebase fica > 50k LOC
- Novos padrões de desenvolvimento
- Time scale mudança

### ADR-009/010: DevOps
**Revisitar quando:**
- Deploy time inaceitável
- CI/CD reliability issue
- Novo requirement (canary deploy, etc)

### ADR-011: Code Quality
**Revisitar quando:**
- Lint rules muito restritivos
- Performance dev degradada

### ADR-012/013/014/015: Libraries
**Revisitar quando:**
- Bugs críticos na lib
- Melhor alternativa com menor cost
- Requirement change

---

## 📝 Template para Novo ADR

Quando você tomar decisão arquitetural importante:

```markdown
### ADR-XXX: [Título da decisão]

**Status**: 🔵 Proposed | ✅ Accepted | ❌ Declined | 🔄 Superseded

**Data**: [Data]

**Proposto por**: [Nome]

#### Contexto
[Por que essa decisão foi necessária?]

#### Decisão
[O que foi decidido?]

#### Justificativa
✅ **Vantagens**:
- [Vantagem 1]
- [Vantagem 2]

❌ **Alternativas rejeitadas**:
- [Alternativa 1: Por quê rejeitada?]

#### Consequências
- ✅ [Benefício]
- ⚠️ [Trade-off]
```

---

## 🎯 Key Takeaways

1. **Todas as decisões têm trade-offs** - nenhuma é perfeita
2. **Decisões podem ser revisitadas** - não são permanentes
3. **Contexto importa** - decisão certa para esse projeto pode ser errada para outro
4. **Documente o porquê** - não apenas o que

---

**Last Updated**: May 2026  
**Maintainer**: Engineering Team  
**Status**: Complete ✅
