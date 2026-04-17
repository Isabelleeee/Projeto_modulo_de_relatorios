import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pypdf import PdfReader
from fpdf import FPDF
from groq import Groq # MUDANÇA: Tiramos o 'AsyncGroq' e usamos o normal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ultima_analise = {
    "sintese": "Nenhuma análise realizada ainda.",
    "riscos": []
}

# --- MOTOR DE PROCESSAMENTO (MODO TANQUE) ---
@app.post("/upload")
def processar_documento(file: UploadFile = File(...)): # MUDANÇA: Tiramos o 'async'
    global ultima_analise
    try:
        print(f"--- Iniciando processamento: {file.filename} ---")
        
        # MUDANÇA: A chave da IA agora liga DENTRO da função, depois que o servidor já acordou
        client = Groq(api_key="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")

        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            buffer.write(file.file.read()) # MUDANÇA: Leitura síncrona segura

        reader = PdfReader(temp_path)
        texto_extraido = " ".join([str(page.extract_text() or "") for page in reader.pages])
        os.remove(temp_path)
        print("Texto extraído com sucesso!")

        prompt = (
            f"Você é um engenheiro de software avaliando um projeto técnico. "
            f"Seja direto e objetivo. Resuma o projeto abaixo em 3 parágrafos claros.\n\n"
            f"TEXTO DO PROJETO:\n{texto_extraido[:6000]}"
        )

        print("Enviando para a IA Groq...")
        chat_completion = client.chat.completions.create( # MUDANÇA: Chamada direta
            messages=[
                {"role": "system", "content": "Responda apenas com o resumo técnico."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.1-8b-instant", 
            temperature=0.3,
        )
        
        texto_ia = chat_completion.choices[0].message.content
        print("Resposta da IA recebida!")

        ultima_analise = {
            "sintese": texto_ia,
            "riscos": [
                "Verificar alocação de tempo no cronograma", 
                "Revisar integrações de banco de dados", 
                "Testes de carga pendentes no MVP"
            ]
        }

        return {"status": "success", "data": ultima_analise}

    except Exception as e:
        print(f"ERRO CRÍTICO NO BACK-END: {e}")
        return {"status": "error", "data": {"sintese": f"Erro: {str(e)}", "riscos": ["Falha no Back-end"]}}


# --- MÓDULO DE GERAÇÃO DE DOCUMENTOS (DOWNLOADS) ---
@app.get("/download/markdown")
def download_markdown():
    file_path = "Relatorio_Projeto.md"
    conteudo = f"# RELATÓRIO ESTRATÉGICO DE PROJETO - MACKENZIE\n\n## Síntese Gerada via IA Neural\n\n{ultima_analise['sintese']}\n\n## Vetor de Riscos\n\n"
    conteudo += "\n".join([f"- {r}" for r in ultima_analise['riscos']])
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(conteudo)
    return FileResponse(file_path, filename="Relatorio_Projeto.md")


@app.get("/download/pdf")
def download_pdf():
    file_path = "Relatorio_Projeto.pdf"
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="RELATÓRIO TÉCNICO DE PROJETO", ln=True, align='C')
    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    texto_limpo = f"SINTESE DA IA:\n\n{ultima_analise['sintese']}".encode('latin-1', 'replace').decode('latin-1')
    pdf.multi_cell(0, 8, txt=texto_limpo) 
    pdf.ln(10)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(200, 10, txt="VETOR DE RISCOS:", ln=True)
    pdf.set_font("Arial", size=12)
    for risco in ultima_analise['riscos']:
        r_limpo = f"- {risco}".encode('latin-1', 'replace').decode('latin-1')
        pdf.cell(200, 8, txt=r_limpo, ln=True)
    pdf.output(file_path)
    return FileResponse(file_path, filename="Relatorio_Projeto.pdf")