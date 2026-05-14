# BEST PRACTICES & STANDARDS

## Code Style

### TypeScript/React
- Use functional components and hooks
- Use interfaces over types when possible
- Avoid `any` type; use `unknown` then narrow
- Use const arrow functions for component definitions
- Keep components under 300 lines of code

**Example:**
```typescript
interface UserProps {
  name: string;
  age: number;
}

const UserCard: React.FC<UserProps> = ({ name, age }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
};
```

### Python
- Follow PEP 8 style guide
- Use type hints for function signatures
- Docstrings for modules, classes, and functions
- Avoid global state; use dependency injection

**Example:**
```python
from typing import Optional

def process_document(file_path: str, max_chars: int = 6000) -> str:
    """
    Process a document and extract text.
    
    Args:
        file_path: Path to the document file
        max_chars: Maximum characters to extract
        
    Returns:
        Extracted text
    """
    # Implementation
    return text
```

---

## Naming Conventions

| Item | Style | Example |
|------|-------|---------|
| Components | PascalCase | `UserCard.tsx`, `HomePage.tsx` |
| Functions/Methods | camelCase | `getUserData()`, `handleClick()` |
| Constants | UPPER_SNAKE_CASE | `API_URL`, `MAX_FILE_SIZE` |
| Files (components) | PascalCase | `UserCard.tsx` |
| Files (utils) | kebab-case | `api-client.ts`, `format-date.ts` |
| Variables | camelCase | `userName`, `isLoading` |
| Classes | PascalCase | `UserService`, `ApiClient` |
| Directories | kebab-case | `user-profile`, `ui-components` |

---

## Folder Structure Best Practices

### Frontend
```
src/
├── app/
│   ├── components/          # Shared components
│   │   ├── ui/             # UI primitives (buttons, inputs, etc.)
│   │   ├── layout/         # Layout components (header, footer, sidebar)
│   │   └── common/         # Common business components
│   ├── pages/              # Page components (one per route)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API clients and external services
│   ├── utils/              # Utility functions
│   ├── context/            # React context (if needed)
│   ├── types/              # TypeScript types and interfaces
│   ├── styles/             # Global styles and theme
│   ├── App.tsx
│   ├── routes.tsx
│   └── layout.tsx
└── main.tsx
```

### Backend
```
backend/
├── main.py                 # FastAPI app initialization
├── config.py              # Configuration management
├── models.py              # Database models (future)
├── schemas.py             # Pydantic schemas for validation
├── routes/
│   ├── __init__.py
│   ├── documents.py       # Document endpoints
│   ├── analysis.py        # Analysis endpoints
│   └── downloads.py       # Download endpoints
├── services/
│   ├── __init__.py
│   ├── groq_service.py    # Groq AI integration
│   ├── pdf_service.py     # PDF processing
│   └── document_service.py
├── utils/
│   ├── __init__.py
│   ├── validators.py      # Input validation
│   └── errors.py          # Custom exceptions
├── requirements.txt
└── uploads/               # File upload directory
```

---

## Git Workflow

### Branch Naming
- `main` - Production code
- `develop` - Development branch
- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `refactor/refactor-name` - Refactoring
- `docs/doc-name` - Documentation

### Commit Messages
Use conventional commits:
```
type(scope): subject

body

footer
```

**Example:**
```
feat(upload): add file size validation

- Validate file size before upload
- Return 413 for oversized files
- Add max file size to config

Closes #123
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `docs:` Documentation
- `test:` Tests
- `chore:` Build, dependencies, etc.

---

## Error Handling

### Frontend
```typescript
try {
  const data = await api.uploadFile(file);
  // Handle success
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  } else if (error instanceof NetworkError) {
    // Handle network error
  } else {
    // Handle generic error
  }
}
```

### Backend
```python
from fastapi import HTTPException
from typing import Optional

class DocumentNotFoundError(Exception):
    pass

@app.post("/upload")
async def upload_document(file: UploadFile):
    try:
        # Validation
        if file.size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413, 
                detail="File too large"
            )
        # Processing
    except DocumentNotFoundError:
        raise HTTPException(status_code=404, detail="Not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Testing Best Practices

### Frontend (Jest/Vitest)
```typescript
describe('UserCard', () => {
  it('should render user information', () => {
    render(<UserCard name="John" age={30} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### Backend (pytest)
```python
def test_upload_valid_file():
    response = client.post("/upload", files={"file": ("test.pdf", b"content")})
    assert response.status_code == 200
    assert "data" in response.json()
```

---

## Security Best Practices

1. **Never commit secrets** - Use `.env.local` (gitignored)
2. **Validate all inputs** - Frontend and backend
3. **Use HTTPS in production** - Not just HTTP
4. **Implement rate limiting** - Prevent abuse
5. **Set appropriate CORS** - Not `*` in production
6. **Sanitize file uploads** - Check extensions and content
7. **Use secure headers** - CSP, X-Frame-Options, etc.
8. **Keep dependencies updated** - Regular security audits

---

## Performance Best Practices

### Frontend
- Code split by route
- Lazy load heavy components
- Use React.memo for expensive renders
- Optimize images (use WebP)
- Minimize bundle size
- Use CSS modules or Tailwind

### Backend
- Use async/await where possible
- Implement caching for repeated queries
- Add database indexes
- Limit query results (pagination)
- Use compression for responses
- Monitor performance metrics

---

## Documentation Best Practices

1. **README.md** - Project overview, quick start
2. **STRUCTURE.md** - Project architecture
3. **DEVELOPMENT.md** - Setup and development guide
4. **API Documentation** - Swagger/OpenAPI
5. **Inline Comments** - Explain "why", not "what"
6. **Type Definitions** - Self-documenting code
7. **Changelog** - Track major changes

---

## Review Checklist

Before committing/pushing:
- [ ] Code passes linter
- [ ] Code is formatted (Prettier)
- [ ] Tests pass
- [ ] Types check (TypeScript)
- [ ] No console.log in production code
- [ ] Comments are clear and helpful
- [ ] Commit message follows convention
- [ ] No secrets in code
- [ ] Documentation updated
