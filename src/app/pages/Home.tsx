import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, ChevronRight, Activity, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

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

  const handleGenerateReport = () => {
    if (file) {
      navigate("/relatorios/new");
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
      className="flex-1 w-full max-w-5xl mx-auto px-12 py-16 h-full flex flex-col gap-14 relative"
    >
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

      {/* Upload Area - Deep Glass */}
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
          {/* Subtle grid background inside dropzone */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Animated gradient sweep when dragging */}
          {isDragging && (
            <motion.div 
              layoutId="pulse"
              className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.08] to-violet-500/[0.05] rounded-[2.5rem] -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
            />
          )}

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
                  ${isDragging ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110 shadow-[0_0_40px_rgba(34,211,238,0.3)] rotate-[-5deg]' : 'bg-[#18181B] text-zinc-500 group-hover:text-cyan-400 group-hover:scale-105 group-hover:rotate-[5deg]'}
                `}>
                  <div className="absolute inset-0 bg-white/[0.02] rounded-[2rem]" />
                  <UploadCloud className="w-10 h-10 transition-transform duration-500 relative z-10 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <p className="text-zinc-200 font-medium text-xl tracking-tight">Arraste a documentação aqui</p>
                  <p className="text-zinc-500 text-sm mt-2 font-light">
                    ou <span className="text-cyan-400 font-semibold pointer-events-auto hover:text-cyan-300 transition-colors cursor-pointer border-b border-cyan-400/30 hover:border-cyan-300 pb-0.5">pesquise em seu sistema</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-zinc-400 text-[10px] font-mono font-bold tracking-widest shadow-inner">.PDF</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-zinc-400 text-[10px] font-mono font-bold tracking-widest shadow-inner">.MD</span>
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
            disabled={!file}
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
            <span className="relative z-10 tracking-wide">COMPILAR RELATÓRIO IA</span>
            <ChevronRight className={`w-5 h-5 relative z-10 transition-transform duration-300 ${file ? 'group-hover:translate-x-2' : ''}`} />
          </motion.button>
        </div>
      </motion.section>

      {/* Holographic Placeholder Cards */}
      <motion.section variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <motion.div 
          variants={itemVariant}
          whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.03)" }}
          className="p-8 bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] shadow-2xl transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl shadow-inner border border-indigo-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">Síntese Estratégica</h3>
          </div>
          <div className="space-y-5 relative z-10">
            <motion.div 
              initial={{ width: "0%" }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full" 
            />
            <motion.div 
              initial={{ width: "0%" }} 
              animate={{ width: "83%" }} 
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full" 
            />
            <motion.div 
              initial={{ width: "0%" }} 
              animate={{ width: "66%" }} 
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              className="h-1.5 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-full" 
            />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariant}
          whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.03)" }}
          className="p-8 bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] shadow-2xl transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl shadow-inner border border-rose-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">Vetor de Riscos</h3>
          </div>
          <div className="space-y-6 flex flex-col justify-center h-full pb-4 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]"></div>
              <motion.div 
                initial={{ width: "0%" }} 
                animate={{ width: "33%" }} 
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="h-1 bg-zinc-800 rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-rose-500/50" />
              </motion.div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]"></div>
              <motion.div 
                initial={{ width: "0%" }} 
                animate={{ width: "50%" }} 
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="h-1 bg-zinc-800 rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-400/50" />
              </motion.div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"></div>
              <motion.div 
                initial={{ width: "0%" }} 
                animate={{ width: "25%" }} 
                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                className="h-1 bg-zinc-800 rounded-full relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-emerald-400/50" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

    </motion.div>
  );
}
