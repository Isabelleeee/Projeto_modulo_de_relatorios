import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pypdf import PdfReader
from fpdf import FPDF
import google.generativeai as genai

app = FastAPI()

# Permite que o Front-end (React) acesse o Back-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURAÇÃO DA IA ---
# IMPORTANTE: Coloque sua chave real aqui entre as aspas
genai.configure(api_key="SUA_CHAVE_AQUI")
model = genai.GenerativeModel('gemini-1.5-flash')

# Variável global para guardar a última análise (para os botões de download)
ultima_analise = {
    "sintese": "Nenhuma análise realizada ainda.",
    "riscos": []
}

# --- MOTOR DE PROCESSAMENTO ---
@app.post("/upload")
async def processar_documento(file: UploadFile = File(...)):
    global ultima_analise
    try:
        print(f"Recebendo arquivo: {file.filename}")
        # Salva o arquivo temporário
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())

        # Extrai o texto do PDF de forma segura
        reader = PdfReader(temp_path)
        texto_extraido = " ".join([str(page.extract_text() or "") for page in reader.pages])
        os.remove(temp_path)

        # Prompt de engenharia limitando a 8000 caracteres (evita estouro de quota)
        prompt = (
            f"Como um consultor de engenharia, analise este documento e forneça:\n"
            f"1. Uma síntese estratégica de 3 parágrafos.\n"
            f"2. Uma lista de 3 riscos técnicos principais.\n\n"
            f"Texto: {texto_extraido[:8000]}"
        )

        print("Enviando para a IA...")
        # A chamada assíncrona evita que o servidor congele (resolve o loading infinito)
        response = await model.generate_content_async(prompt)
        texto_ia = response.text.replace("*", "") 
        print("Resposta recebida!")

        # Atualiza a memória do servidor com os dados processados
        ultima_analise = {
            "sintese": texto_ia,
            "riscos": ["Análise concluída com sucesso", "Riscos detalhados no corpo do texto", "Geração via IA Neural"]
        }

        return {"status": "success", "data": ultima_analise}

    except Exception as e:
        print(f"ERRO NO BACK-END: {e}")
        # Devolve o erro no formato dos cards para destravar a tela do usuário
        erro_formatado = {
            "sintese": f"Erro de processamento: {str(e)}",
            "riscos": ["Verifique a API Key", "Verifique o Terminal do Python"]
        }
        return {"status": "error", "data": erro_formatado}


# --- MÓDULO DE GERAÇÃO DE DOCUMENTOS (DOWNLOADS) ---
@app.get("/download/markdown")
async def download_markdown():
    file_path = "Relatorio_IA.md"
    conteudo = f"# RELATÓRIO DE INSIGHTS - MACKENZIE\n\n## Síntese\n{ultima_analise['sintese']}\n\n## Riscos\n"
    conteudo += "\n".join([f"- {r}" for r in ultima_analise['riscos']])
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(conteudo)
    
    return FileResponse(file_path, filename="Relatorio_Mackenzie.md")


@app.get("/download/pdf")
async def download_pdf():
    file_path = "Relatorio_IA.pdf"
    pdf = FPDF()
    pdf.add_page()
    
    # Cabeçalho
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="RELATÓRIO TÉCNICO IA", ln=True, align='C')
    
    # Corpo do texto
    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    
    # Limpa caracteres especiais que o FPDF padrão não suporta
    texto_limpo = f"SÍNTESE:\n{ultima_analise['sintese']}".encode('latin-1', 'replace').decode('latin-1')
    pdf.multi_cell(0, 10, txt=texto_limpo) 
    
    pdf.output(file_path)
    return FileResponse(file_path, filename="Relatorio_Mackenzie.pdf")