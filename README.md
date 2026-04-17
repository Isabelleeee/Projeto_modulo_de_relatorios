# 📑 Módulo de Relatórios Inteligente (IA)

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq_Llama_3.1-orange?style=for-the-badge)

> **Projeto Acadêmico - Universidade Presbiteriana Mackenzie (2026)**
> Sistema inteligente para análise técnica de documentos e geração automática de relatórios de riscos.

---

## 👥 Contribuições e Responsabilidades

O projeto foi desenvolvido em regime de colaboração técnica, dividindo as frentes de atuação:

### 👩‍💻 Isabelle (Pessoa A) — Frontend & UX Lead
- **Interface Reativa:** Desenvolvimento do Dashboard utilizando React e Tailwind CSS.
- **Experiência do Usuário (UX):** Implementação de animações de interface e estados dinâmicos com Framer Motion.
- **Integração de Consumo:** Conexão do cliente com as rotas do servidor e tratamento de dados recebidos da IA.
- **Documentação Técnica:** Organização do fluxo de trabalho e estruturação visual do repositório.

### 👨‍💻 Lucas (Pessoa B) — Backend & AI Engineer
- **Arquitetura de Servidor:** Construção da API utilizando FastAPI com gestão de rotas síncronas.
- **Engenharia de Prompt:** Integração e ajuste fino do modelo Llama 3.1 via Groq Cloud.
- **Processamento de Dados:** Desenvolvimento do motor de extração de texto (PyPDF) e geração de PDFs (FPDF2).
- **Segurança & DevOps:** Configuração de variáveis de ambiente (.env) e segurança de credenciais locais.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Python, FastAPI, Uvicorn |
| **IA** | Groq API (Llama 3.1 8B Instant) |
| **Arquivos** | PyPDF, FPDF2 |

---

## ⚙️ Como Rodar o Projeto

### 1. Preparação do Back-end (Python)
```bash
cd backend
python -m pip install -r requirements.txt

### Importante: Crie um arquivo .env na pasta backend com a sua chave:

GROQ_API_KEY=gsk_sua_chave_aqui

### Ligar o Servidor:
python -m uvicorn main:app --reload 

## 2. Preparação do Front-end (React)
##Em um novo terminal:
npm install
npm run dev

📝 Funcionalidades
Análise Instantânea: Extração de insights técnicos de arquivos PDF.

Vetor de Riscos: Identificação automática de pontos de atenção no projeto.

Exportação Profissional: Geração de relatórios formatados em PDF e Markdown.