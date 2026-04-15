import { useState } from "react";
import { 
  ArrowLeft, Download, AlertTriangle, FileText, CheckCircle2, 
  BarChart3, FileType, Link as LinkIcon, X, Check, Zap, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";

export default function ReportDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "docx" | "link">("pdf");
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsExportModalOpen(false);
    }, 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 w-full max-w-7xl mx-auto px-12 py-16 h-full flex flex-col gap-14 relative overflow-hidden"
    >
      
      {/* Header */}
      <motion.header variants={itemVariant} className="flex flex-col gap-8 relative z-10">
        <button 
          onClick={() => navigate("/relatorios")}
          className="flex items-center gap-3 text-xs font-bold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors w-max group"
        >
          <div className="p-2.5 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-white/[0.1] transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1.5" />
          </div>
          VOLTAR PARA REGISTROS
        </button>

        <div className="flex justify-between items-start mt-2">
          <div>
            <div className="flex items-center gap-5 mb-4">
              <div className="relative flex items-center">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[10px] rounded-full" />
                <span className="relative inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-emerald-950/50 text-emerald-400 tracking-[0.2em] uppercase border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> SINTETIZADO
                </span>
              </div>
              <span className="text-xs font-bold text-zinc-500 tracking-wider">15 ABR 2026</span>
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-2 bg-cyan-950/30 px-4 py-1.5 rounded-full border border-cyan-500/20 tracking-wide">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                98% PRECISÃO IA
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Sprint 14 - Análise de Requisitos
            </h1>
            <p className="text-[15px] font-medium text-zinc-400 mt-5 flex items-center gap-3">
              <FileText className="w-5 h-5 text-zinc-500" /> 
              Artefato base: 
              <span className="text-zinc-200 bg-white/[0.05] px-3 py-1 rounded-md border border-white/[0.1] shadow-inner font-mono text-sm">spec_v2.pdf</span>
            </p>
          </div>
        </div>
      </motion.header>

      {/* Grid Content */}
      <motion.div variants={container} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Main Column */}
        <motion.div variants={itemVariant} className="lg:col-span-2 space-y-8">
          <div className="bg-[#0A0A0A]/60 backdrop-blur-2xl p-12 border border-white/[0.05] rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[100px] -z-10 group-hover:bg-indigo-500/10 transition-colors duration-700" />
            <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-4 tracking-tight">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 shadow-inner border border-indigo-500/20">
                <BarChart3 className="w-6 h-6" />
              </div>
              Visão Geral do Modelo
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-zinc-400 font-light leading-relaxed space-y-8">
              <p>
                A análise neural do documento <strong className="text-zinc-200 font-medium">"spec_v2.pdf"</strong> revela um alinhamento estrutural sólido com os objetivos estratégicos do projeto Mackenzie. As definições arquiteturais estão consistentes com a topologia de nuvem proposta, e as especificações de API foram mapeadas de forma determinística. A integração com os modelos fundacionais (Gemini e OpenAI) está adequadamente isolada.
              </p>
              <p>
                O modelo identifica, no entanto, a necessidade de aprofundar os vetores de contingência para falhas de rede durante inferências de alto volume. A latência projetada permanece na margem aceitável de 200ms, mas anomalias de pico podem degradar a métrica se as políticas de auto-scaling não forem parametrizadas na camada de proxy.
              </p>
              <p className="p-8 bg-indigo-950/20 rounded-[1.5rem] border border-indigo-500/20 text-indigo-200 font-medium italic shadow-inner relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                Em síntese, a iteração atual possui um grau excepcional de viabilidade técnica. A recomendação do oráculo é iniciar os ensaios de prototipagem das APIs cognitivas antes de cristalizar o esquema do banco de dados vetorial.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Side Column */}
        <motion.div variants={container} className="space-y-8">
          {/* Análise de Risco */}
          <motion.div variants={itemVariant} className="bg-[#0A0A0A]/60 backdrop-blur-2xl p-10 border border-white/[0.05] rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-4 tracking-tight">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 shadow-inner border border-amber-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              Vetor de Riscos
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-rose-500/20 shadow-sm hover:bg-rose-500/5 transition-colors duration-300">
                <span className="text-[15px] font-semibold text-zinc-300">Latência de API</span>
                <span className="text-[10px] font-black px-3 py-1.5 bg-rose-500/20 text-rose-400 rounded-full uppercase tracking-widest border border-rose-500/30">Crítico</span>
              </div>
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-amber-500/20 shadow-sm hover:bg-amber-500/5 transition-colors duration-300">
                <span className="text-[15px] font-semibold text-zinc-300">Consumo de Tokens</span>
                <span className="text-[10px] font-black px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-full uppercase tracking-widest border border-amber-500/30">Moderado</span>
              </div>
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/20 shadow-sm hover:bg-emerald-500/5 transition-colors duration-300">
                <span className="text-[15px] font-semibold text-zinc-300">Isolamento de Dados</span>
                <span className="text-[10px] font-black px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full uppercase tracking-widest border border-emerald-500/30">Baixo</span>
              </div>
            </div>
          </motion.div>

          {/* Principais Recomendações */}
          <motion.div variants={itemVariant} className="bg-[#0A0A0A]/60 backdrop-blur-2xl p-10 border border-white/[0.05] rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-4 tracking-tight">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-inner border border-cyan-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              Sugestões Neurais
            </h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-bold text-zinc-300">Otimizar cache local</span>
                  <span className="text-cyan-400 text-xs font-black tracking-widest">98%</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 shadow-inner overflow-hidden border border-white/[0.05]">
                  <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="bg-cyan-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-bold text-zinc-300">Revisar regras de scaling</span>
                  <span className="text-cyan-500 text-xs font-black tracking-widest">85%</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 shadow-inner overflow-hidden border border-white/[0.05]">
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} className="bg-cyan-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-bold text-zinc-300">Circuito de Fallback IA</span>
                  <span className="text-cyan-600 text-xs font-black tracking-widest">72%</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 shadow-inner overflow-hidden border border-white/[0.05]">
                  <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }} className="bg-cyan-600 h-1.5 rounded-full shadow-[0_0_10px_rgba(8,145,178,0.8)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Action Area */}
      <motion.div variants={itemVariant} className="mt-10 flex justify-center pb-12 relative z-20">
        <motion.button 
          whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-black tracking-wide shadow-2xl hover:bg-zinc-200 transition-all duration-500 overflow-hidden group relative"
        >
          <Download className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform" />
          <span className="relative z-10 text-[15px]">EXPORTAR ARQUIVO</span>
        </motion.button>
      </motion.div>

      {/* Modal de Exportação */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setIsExportModalOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-[#0A0A0A] border border-white/[0.1] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-2 ring-1 ring-white/[0.02]"
            >
              <div className="flex items-center justify-between p-8 pb-4">
                <h3 className="font-bold text-2xl text-white tracking-tight">Formato de Saída</h3>
                <button 
                  onClick={() => setIsExportModalOpen(false)}
                  className="p-2.5 bg-white/[0.05] hover:bg-white/[0.1] rounded-full text-zinc-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 space-y-4 pt-2">
                {[
                  { id: "pdf", icon: FileType, title: "Binário PDF", desc: "Rasterização fixa para impressão" },
                  { id: "docx", icon: FileText, title: "Documento DOCX", desc: "Mutável no pacote Office" },
                  { id: "link", icon: LinkIcon, title: "Nó Compartilhável", desc: "Acesso por token criptografado" },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setExportFormat(item.id as any)}
                    className={`w-full flex items-center gap-5 p-5 rounded-[1.5rem] border transition-all duration-300 group ${
                      exportFormat === item.id 
                        ? "border-cyan-500/50 bg-cyan-950/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                        : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1]"
                    }`}
                  >
                    <div className={`p-3.5 rounded-2xl transition-colors duration-300 ${exportFormat === item.id ? "bg-cyan-500/20 text-cyan-400" : "bg-white/[0.05] text-zinc-500 group-hover:text-zinc-300"}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-base font-bold transition-colors ${exportFormat === item.id ? "text-cyan-100" : "text-zinc-300"}`}>{item.title}</p>
                      <p className="text-xs font-medium text-zinc-500 mt-1">{item.desc}</p>
                    </div>
                    {exportFormat === item.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-1 bg-cyan-500 rounded-full text-black shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="w-full flex justify-center items-center gap-3 px-8 py-5 bg-white text-black rounded-[1.5rem] font-black text-[13px] tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isExporting ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                    />
                  ) : (
                    <>
                      <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                      INICIAR DOWNLOAD
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
