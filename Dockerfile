# Build stage
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Backend & Frontend serving
FROM python:3.11-slim
WORKDIR /app

# Install Node runtime for serving frontend
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend
COPY --from=frontend-builder /app/dist ./static
COPY backend ./backend

# Environment
ENV PYTHONUNBUFFERED=1
ENV VITE_API_URL=/api

EXPOSE 8000

# Start FastAPI backend (serves static files too)
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
