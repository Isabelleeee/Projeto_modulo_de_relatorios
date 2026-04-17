from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CRITICAL: Isso permite que o seu Front (Pessoa A) fale com o Back (Pessoa B)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # No futuro, coloque o link do seu site aqui
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Servidor Mackenzie Online"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename, "status": "Recebido pelo Python!"}