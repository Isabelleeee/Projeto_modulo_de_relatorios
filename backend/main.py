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
    // Dentro da function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState({ sintese: '', riscos: [] });

    // O 'controle remoto' para abrir a janela de arquivos do Windows
    const fileInputRef = useRef<HTMLInputElement>(null);
    return {"status": "Servidor Mackenzie Online"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename, "status": "Recebido pelo Python!"}