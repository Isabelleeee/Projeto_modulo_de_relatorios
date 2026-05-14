# PROJECT STRUCTURE DOCUMENTATION

## Overview
This is a professional full-stack application for project analysis using AI (Groq).

## Directory Structure

```
.
├── backend/                    # Python FastAPI backend
│   ├── main.py                # Main application (refactor incoming)
│   ├── requirements.txt        # Python dependencies
│   ├── uploads/               # File upload directory
│   └── .env                   # Environment variables (gitignored)
│
├── src/                        # Frontend React/TypeScript
│   ├── main.tsx               # Entry point
│   ├── app/
│   │   ├── App.tsx            # Main app component
│   │   ├── routes.tsx         # Route definitions
│   │   ├── layout.tsx         # Layout component
│   │   ├── pages/             # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── ReportDetail.tsx
│   │   │   └── Settings.tsx
│   │   └── components/        # Reusable components
│   │       ├── ui/            # UI components (shadcn/ui)
│   │       └── figma/         # Figma-specific components
│   └── styles/                # Global styles
│
├── guidelines/                # Project guidelines
├── package.json              # Frontend dependencies
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint rules
├── .prettierrc                # Code formatting rules
├── vite.config.ts            # Vite bundler config
├── .env.example              # Environment variables template
└── README.md                 # Project documentation
```

## Key Configuration Files

### Frontend
- **tsconfig.json** - TypeScript strict mode, path aliases (@/*, @components/*, etc)
- **.eslintrc.json** - Linting rules for React, TypeScript, hooks
- **.prettierrc** - Code formatting (2 spaces, single quotes, 100 char line width)
- **vite.config.ts** - Vite bundler configuration with React and Tailwind plugins

### Backend
- **requirements.txt** - Python dependencies (FastAPI, Groq, PyPDF, etc)
- **main.py** - FastAPI app with endpoints for upload, analysis, and downloads

### Environment Variables (.env.example)
```
Frontend:
- VITE_API_URL: Backend API URL
- VITE_APP_NAME: Application name

Backend:
- GROQ_API_KEY: Groq API key for AI analysis
- LOG_LEVEL: Logging level
```

## Next Steps

### Phase 2: Backend Refactoring
- [ ] Create modular structure: config.py, models.py, routes.py, utils.py
- [ ] Implement SQLite database for persistent storage
- [ ] Add proper logging and error handling
- [ ] Implement file cleanup for temp files
- [ ] Add input validation and security checks

### Phase 3: Frontend Improvements
- [ ] Create API client abstraction layer
- [ ] Implement error boundaries
- [ ] Add loading states and error handling
- [ ] Organize components by feature

### Phase 4: Production Ready
- [ ] Add authentication (JWT)
- [ ] Create Docker + Docker Compose
- [ ] Setup CI/CD with GitHub Actions
- [ ] Add unit tests (Jest, pytest)
- [ ] Deploy to Azure App Service

## Development Commands

### Frontend
```bash
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

### Backend
```bash
pip install -r requirements.txt    # Install dependencies
python -m uvicorn backend.main:app --reload  # Start dev server
```

## Technology Stack

### Frontend
- React 18.3.1
- TypeScript
- Tailwind CSS 4.1.12
- Vite 6.3.5
- React Router 7.13.0
- Radix UI + shadcn/ui
- Framer Motion

### Backend
- FastAPI (modern async Python framework)
- Groq AI API (LLaMA 3.1 8B)
- PyPDF + FPDF2 (PDF processing)
- Python-dotenv (environment management)

## Security Notes
- CORS currently allows all origins (*) - restrict for production
- Environment variables must be kept secure
- File uploads should have size limits
- Implement authentication before deploying
