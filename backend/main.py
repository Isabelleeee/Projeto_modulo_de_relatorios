from fastapi import FastAPI, UploadFile, File
import shutil
import os

app = FastAPI()

# Criar uma pasta temporária para salvar os arquivos recebidos (opcional)
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.post("/upload")
async def receber_arquivo_da_maquina(file: UploadFile = File(...)):
    """
    Esta rota cria o 'botão' de upload na documentação para testes.
    """
    # Caminho onde o arquivo será salvo no seu PC
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    # Salva o arquivo que veio da sua máquina na pasta 'uploads'
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {
        "mensagem": "Arquivo recebido com sucesso!",
        "nome_do_arquivo": file.filename,
        "caminho_local": file_path
    }