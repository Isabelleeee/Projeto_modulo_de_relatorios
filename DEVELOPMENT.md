# PROJECT SETUP GUIDE

## Quick Start

### Prerequisites
- Node.js 20+ (for frontend)
- Python 3.11+ (for backend)
- Git

### Environment Setup

1. **Copy environment template:**
```bash
cp .env.example .env.local
```

2. **Fill in the required variables in `.env.local`:**
```env
VITE_API_URL=http://localhost:8000
GROQ_API_KEY=your_actual_groq_api_key
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server (Vite)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

Frontend will be available at: **http://localhost:5173**

### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start development server
python -m uvicorn backend.main:app --reload

# Or use Python path directly:
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend API will be available at: **http://localhost:8000**

API documentation (auto-generated): **http://localhost:8000/docs**

---

## Docker Setup (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

---

## API Endpoints

### Upload & Analysis
- **POST** `/upload` - Upload a PDF or Markdown file for analysis
  - Returns: AI-generated summary and risk vector

### Document Generation
- **GET** `/download/markdown` - Download analysis as Markdown
- **GET** `/download/pdf` - Download analysis as PDF

### Health Check
- **GET** `/status` - Check if backend is running

---

## Development Workflow

### Code Style
- **Linting:** `npm run lint` (ESLint for TypeScript)
- **Formatting:** `npm run format` (Prettier)
- **Pre-commit:** Configure hooks with Husky (optional)

### Recommended IDE Extensions
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Python
- Pylance

### Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── routes.tsx     # Route definitions
│   └── styles/            # Global CSS
│
├── backend/
│   ├── main.py           # FastAPI app
│   ├── config.py         # Configuration
│   └── requirements.txt   # Python dependencies
│
└── [Config files]
    ├── tsconfig.json     # TypeScript config
    ├── vite.config.ts    # Vite bundler config
    └── .eslintrc.json    # Linting rules
```

---

## Troubleshooting

### Python Errors
```bash
# Reinstall dependencies
pip install --upgrade -r backend/requirements.txt

# Clear Python cache
find . -type d -name __pycache__ -exec rm -r {} +
```

### Node/Frontend Errors
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### CORS Issues
- Ensure `VITE_API_URL` matches backend address
- Check backend CORS settings in `backend/config.py`

### Groq API Errors
- Verify `GROQ_API_KEY` is valid
- Check Groq console for API status

---

## Next Steps
1. Run frontend and backend locally
2. Upload a PDF or Markdown file to test
3. Check the generated analysis
4. Explore the code structure
5. Make changes and test

For deployment guidance, see [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md)
