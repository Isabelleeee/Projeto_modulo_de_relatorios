import { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, ChevronRight, Activity, Sparkles, Zap, FileDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUploadAndAnalyze } from "../../hooks";
import { documentService } from "../../features/documents";
import type { AnalysisResponse } from "../../types/api";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentFileId, setCurrentFileId] = useState<number | null>(null);
  const [resultado, setResultado] = useState<AnalysisResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the new API hook
  const { uploadAndAnalyze, loading, error } = useUploadAndAnalyze();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleGenerateReport = async () => {
    if (!file) return;

    try {
      const result = await uploadAndAnalyze(file);
      setResultado(result.analysis);
      if (result.upload?.file_id) {
        setCurrentFileId(result.upload.file_id);
      }
    } catch (err) {
      // Error is already handled by the hook
      console.error("Analysis failed:", err);
    }
  };

  const handleDownload = async (format: 'markdown' | 'pdf') => {
    if (!currentFileId) {
      alert('Gere o relatório antes de baixar o arquivo.');
      return;
    }

    try {
      const { blob, filename } = await documentService.downloadReport(currentFileId, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
      alert(`Erro ao baixar arquivo ${format.toUpperCase()}`);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex-1 w-full max-w-5xl mx-auto px-12 pt-16 pb-32 min-h-screen flex flex-col gap-14 relative"
    >
      {/* Input de arquivo invisível para abrir o popup do Windows */}
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.md"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Header Greeting */}
      <motion.header variants={itemVariant} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="absolute top-16 left-12 w-24 h-24 bg-cyan-500/20 blur-[60px]" />
          <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-cyan-300 text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            Projeto Mackenzie
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight flex items-center gap-4 mt-2">
          Bom dia, <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500">Sarah.</span>
          <motion.div 
            animate={{ rotate: [0, 15, -10, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 4 }}
          >
            👋
          </motion.div>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-lg mt-3 leading-relaxed font-light">
          Faça o upload dos artefatos mais recentes <span className="text-white">(.PDF ou .MD)</span> para gerar insights, métricas e análises de risco automatizadas pela IA neural.
        </p>
      </motion.header>

      {/* Upload Area */}
      <motion.section variants={itemVariant} className="w-full flex flex-col gap-8 relative z-10">
        <motion.div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{ scale: isDragging ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`relative flex flex-col items-center justify-center p-20 rounded-[2.5rem] border-2 border-dashed transition-all duration-500 group overflow-hidden bg-[#0A0A0A]/40 backdrop-blur-2xl ring-1 ring-white/[0.02]
            ${isDragging 
              ? 'border-cyan-400/50 bg-cyan-950/20 shadow-[0_0_60px_rgba(34,211,238,0.15)]' 
              : 'border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.02] shadow-2xl'
            }
          `}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <AnimatePresence mode="wait">
            {file ? (
              <motion.div 
                key="file"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col items-center gap-6 text-center relative z-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-[30px] animate-pulse" />
                  <div className="relative h-24 w-24 bg-gradient-to-b from-emerald-400 to-emerald-600 text-black rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.3)] ring-1 ring-white/20 rotate-3">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                </div>
                <div>
                  <p className="text-white font-bold text-xl tracking-tight">{file.name}</p>
                  <p className="text-emerald-400 font-medium text-sm mt-2 flex items-center justify-center gap-2 tracking-wide uppercase">
                    <Sparkles className="w-4 h-4" /> Pronto para IA
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="px-6 py-2.5 mt-4 rounded-full text-xs font-bold text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-rose-500/20 hover:border-rose-500/50 border border-transparent transition-all"
                >
                  REMOVER ARTEFATO
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="upload"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col items-center gap-6 text-center cursor-pointer pointer-events-none relative z-10"
              >
                <div className={`relative h-24 w-24 rounded-[2rem] flex items-center justify-center transition-all duration-700 shadow-xl border border-white/[0.05]
                  ${isDragging ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110 rotate-[-5deg]' : 'bg-[#18181B] text-zinc-500 group-hover:text-cyan-400 group-hover:scale-105 group-hover:rotate-[5deg]'}
                `}>
                  <UploadCloud className="w-10 h-10 transition-transform duration-500 relative z-10 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <p className="text-zinc-200 font-medium text-xl tracking-tight">Arraste a documentação aqui</p>
                  <p className="text-zinc-500 text-sm mt-2 font-light">
                    ou <span 
                      onClick={() => fileInputRef.current?.click()} 
                      className="text-cyan-400 font-semibold cursor-pointer pointer-events-auto hover:text-cyan-300 transition-colors border-b border-cyan-400/30"
                    >
                      pesquise em seu sistema
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateReport}
            disabled={!file || loading}
            className={`relative overflow-hidden flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-bold text-[15px] transition-all duration-500
              ${file 
                ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.15)] group ring-1 ring-white/50' 
                : 'bg-white/[0.03] text-zinc-600 border border-white/[0.05] cursor-not-allowed'
              }
            `}
          >
            {file && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
            <Zap className={`w-5 h-5 relative z-10 ${file ? 'text-indigo-600 group-hover:text-black transition-colors' : ''}`} />
            <span className="relative z-10 tracking-wide">
              {loading ? "PROCESSANDO VIA IA..." : "COMPILAR RELATÓRIO IA"}
            </span>
            <ChevronRight className={`w-5 h-5 relative z-10 transition-transform duration-300 ${file ? 'group-hover:translate-x-2' : ''}`} />
          </motion.button>
        </div>
      </motion.section>

      {/* Error Display */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Holographic Placeholder Cards */}
      <motion.section variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* CARD SÍNTESE */}
        <motion.div 
          variants={itemVariant}
          whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.03)" }}
          className="p-8 bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] shadow-2xl transition-all duration-500 group relative overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">Síntese Estratégica</h3>
          </div>
          <div className="space-y-5 relative z-10">
            {resultado?.summary ? (
              <p className="text-zinc-300 text-sm leading-relaxed font-light">{resultado.summary}</p>
            ) : (
              <>
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full" />
                <motion.div initial={{ width: "0%" }} animate={{ width: "83%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} className="h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full" />
                <motion.div initial={{ width: "0%" }} animate={{ width: "66%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }} className="h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full" />
              </>
            )}
          </div>
        </motion.div>

        {/* CARD VETOR DE RISCOS */}
        <motion.div 
          variants={itemVariant}
          whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.03)" }}
          className="p-8 bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] shadow-2xl transition-all duration-500 group relative overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">Vetor de Riscos</h3>
          </div>
          <div className="space-y-6 flex flex-col justify-center h-full pb-4 relative z-10">
            {resultado?.risks && resultado.risks.length > 0 ? (
              resultado.risks.map((risco, index) => (
                <div key={risco.id || index} className="flex items-center gap-5">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.8)] ${
                    risco.severity === 'high' ? 'bg-red-500' :
                    risco.severity === 'medium' ? 'bg-yellow-500' :
                    risco.severity === 'low' ? 'bg-green-500' : 'bg-rose-500'
                  }`}></div>
                  <p className="text-zinc-300 text-xs font-light tracking-wide">{risco.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]"></div>
                  <motion.div initial={{ width: "0%" }} animate={{ width: "33%" }} transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} className="h-1 bg-zinc-800 rounded-full relative overflow-hidden"><div className="absolute inset-0 bg-rose-500/50" /></motion.div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]"></div>
                  <motion.div initial={{ width: "0%" }} animate={{ width: "50%" }} transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} className="h-1 bg-zinc-800 rounded-full relative overflow-hidden"><div className="absolute inset-0 bg-amber-400/50" /></motion.div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"></div>
                  <motion.div initial={{ width: "0%" }} animate={{ width: "25%" }} transition={{ duration: 1, ease: "easeOut", delay: 0.7 }} className="h-1 bg-zinc-800 rounded-full relative overflow-hidden"><div className="absolute inset-0 bg-emerald-400/50" /></motion.div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.section> {/* Este fecha a grid de 2 colunas */}

      {/* NOVO BLOCO: MÓDULO DE EXPORTAÇÃO DE RELATÓRIOS */}
      <AnimatePresence>
        {resultado?.summary && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-12 p-10 rounded-[2.5rem] bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/[0.05] shadow-2xl relative overflow-hidden group"
          >
            {/* Efeito de luz de fundo */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-transparent opacity-100" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                  <FileDown className="w-8 h-8 text-cyan-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Relatório Consolidado</h3>
                  <p className="text-zinc-500 text-sm mt-1 font-light">Documentação técnica gerada via IA Neural Mackenzie</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Botão Markdown */}
                <button 
                  onClick={() => handleDownload('markdown')}
                  className="px-8 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-all font-bold text-xs tracking-widest uppercase"
                >
                  Gerar .MD
                </button>

                <button 
                  onClick={() => handleDownload('docx')}
                  className="px-8 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-all font-bold text-xs tracking-widest uppercase"
                >
                  Exportar .DOCX
                </button>

                <button 
                  onClick={() => handleDownload('pdf')}
                  className="group/btn relative px-8 py-4 rounded-2xl bg-white text-black font-black text-xs tracking-widest uppercase overflow-hidden transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    Exportar PDF <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}