# 📑 Módulo de Relatórios Inteligente (IA)

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq_Llama_3.1-orange?style=for-the-badge)

> **Projeto Acadêmico - Universidade Presbiteriana Mackenzie (2026)**
> Sistema inteligente para análise técnica de documentos e geração automática de relatórios de riscos.

---

### 👥 Colaboradores

Este projeto foi desenvolvido sob um modelo de responsabilidade técnica compartilhada. Ambos os membros atuaram ativamente em todas as etapas do ciclo de desenvolvimento do software, incluindo:

* **Arquitetura e Design de Software:** Definição estrutural baseada em Clean Architecture e modularização dos componentes do sistema.
* **Desenvolvimento Full-Stack:** Implementação lógica, construção do sistema e integração com APIs externas.
* **Qualidade e Manutenção:** *Troubleshooting* contínuo, revisão mútua de código (*code review*) e elaboração de documentação e diagramas técnicos.

---

* **Isabelle Costa** – Engenharia de Software & Desenvolvimento End-to-End
* **Lucas Oliveira** – Engenharia de Software & Desenvolvimento End-to-End

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

### 1. Preparação do Back-end
```bash
cd backend
python -m pip install -r requirements.txt
```

### 2. Configurar variáveis de ambiente
Copie `.env.example` para `.env` e preencha os valores:

```env
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=sqlite:///./project_analysis.db
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Iniciar o servidor Back-end
A partir da pasta `backend`:
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A partir da raiz do projeto:
```bash
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Preparação do Front-end (React)
Em um novo terminal:
```bash
npm install
npm run dev
```

### 5. Deploy Local com Docker
```bash
docker compose up --build
```

### 6. Azure
Para deploy em Azure, use o workflow localizado em `.github/workflows/main_projetoengsoftmodulorelatorios.yml` e consulte `AZURE_DEPLOYMENT.md`.

#### Secrets do GitHub necessários
- `AZURE_CREDENTIALS`: JSON do service principal Azure
- `AZURE_WEBAPP_NAME`: nome do App Service no Azure
- `GROQ_API_KEY`: chave de API Groq

📝 Funcionalidades
- Análise Instantânea: Extração de insights técnicos de arquivos PDF.
- Vetor de Riscos: Identificação automática de pontos de atenção no projeto.
- Exportação Profissional: Geração de relatórios formatados em PDF e Markdown.
