import { useState } from "react";
import { Save, Settings2, Key, Users, Box, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 w-full max-w-5xl mx-auto px-12 py-16 h-full flex flex-col gap-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/10 to-cyan-900/10 rounded-[3rem] blur-[100px] -z-10 opacity-60 pointer-events-none" />

      {/* Header */}
      <motion.header variants={itemVariant} className="flex flex-col gap-5 pb-8 relative">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/[0.1] to-transparent" />
        
        <div className="flex items-center gap-5 mb-2">
          <div className="p-3.5 bg-indigo-500/10 rounded-[1.25rem] border border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Settings2 className="w-6 h-6" />
          </div>
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-zinc-400 text-[10px] font-black tracking-[0.2em] uppercase shadow-inner">
            Superusuário
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
          Configuração <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Sistêmica</span>
        </h1>
        <p className="text-zinc-500 text-lg font-light max-w-2xl mt-3 leading-relaxed">
          Módulos de preferência global para a entidade Mackenzie e gerenciamento criptografado de tokens de IA preditiva.
        </p>
      </motion.header>

      {/* Form Content */}
      <motion.form 
        variants={itemVariant}
        onSubmit={handleSave}
        className="flex flex-col gap-14"
      >
        
        {/* Section: MACKENZIE */}
        <section className="space-y-8">
          <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-zinc-700 to-transparent rounded-full" /> NÚCLEO MACKENZIE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 group">
              <label className="text-xs font-bold text-zinc-400 tracking-wider flex items-center gap-3 transition-colors group-focus-within:text-cyan-400">
                <Box className="w-4 h-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                IDENTIFICADOR DO NÓ
              </label>
              <input 
                type="text" 
                defaultValue="Projeto Mackenzie"
                className="w-full px-6 py-5 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/[0.05] rounded-[1.5rem] text-[15px] text-white font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/[0.02] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
            </div>
            
            <div className="space-y-4 group">
              <label className="text-xs font-bold text-zinc-400 tracking-wider flex items-center gap-3 transition-colors group-focus-within:text-cyan-400">
                <Users className="w-4 h-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                VETOR DE USUÁRIOS
              </label>
              <input 
                type="text" 
                defaultValue="Sarah, John, Amanda"
                className="w-full px-6 py-5 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/[0.05] rounded-[1.5rem] text-[15px] text-white font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/[0.02] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="space-y-4 md:col-span-2 group">
              <label className="text-xs font-bold text-zinc-400 tracking-wider flex items-center gap-3 transition-colors group-focus-within:text-cyan-400">
                <Terminal className="w-4 h-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                TOPOLOGIA DA ARQUITETURA
              </label>
              <textarea 
                rows={3}
                defaultValue="Microsserviços, AWS (EKS, RDS, S3), Frontend em React, Backend em Node.js e Python para inferência local de modelos."
                className="w-full px-6 py-5 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/[0.05] rounded-[1.5rem] text-[15px] text-white font-light focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/[0.02] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] resize-none leading-relaxed"
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] w-full rounded-full" />

        {/* Section: API IA */}
        <section className="space-y-8">
          <h2 className="text-xs font-black text-cyan-500 uppercase tracking-[0.2em] flex items-center gap-4">
            <div className="h-px w-10 bg-gradient-to-r from-cyan-600 to-transparent rounded-full" /> MOTORES COGNITIVOS <Sparkles className="w-4 h-4 text-cyan-400" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 group">
              <label className="text-xs font-bold text-zinc-400 tracking-wider flex items-center gap-3 transition-colors group-focus-within:text-indigo-400">
                <Key className="w-4 h-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                TOKEN PRIMÁRIO (GEMINI)
              </label>
              <input 
                type="password" 
                defaultValue="AIzaSyA_****************************"
                className="w-full px-6 py-5 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/[0.05] rounded-[1.5rem] text-[15px] text-zinc-300 font-mono tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/[0.02] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
            </div>
            
            <div className="space-y-4 group">
              <label className="text-xs font-bold text-zinc-400 tracking-wider flex items-center gap-3 transition-colors group-focus-within:text-indigo-400">
                <Key className="w-4 h-4 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                TOKEN SECUNDÁRIO (OPENAI)
              </label>
              <input 
                type="password" 
                defaultValue="sk-proj-************************************"
                className="w-full px-6 py-5 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/[0.05] rounded-[1.5rem] text-[15px] text-zinc-300 font-mono tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/[0.02] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
          <p className="text-[13px] text-zinc-500 font-medium mt-6 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl shadow-inner inline-block flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            Tokens são criptografados on-device antes do armazenamento em cofre KMS.
          </p>
        </section>

        {/* Action Area */}
        <div className="pt-10 mt-2 flex justify-end relative">
          <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-white/[0.1] to-transparent" />
          
          <motion.button 
            whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSaving || isSaved}
            className={`flex items-center gap-4 px-12 py-5 rounded-full text-[13px] font-black tracking-widest transition-all duration-500 shadow-2xl relative overflow-hidden group border border-white/[0.1]
              ${isSaved ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'bg-white text-black hover:bg-zinc-200'}
              disabled:opacity-90 disabled:cursor-not-allowed`}
          >
            {!isSaved && !isSaving && <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
            
            <AnimatePresence mode="wait">
              {isSaving ? (
                <motion.div 
                  key="saving"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-4 text-black"
                >
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full relative z-10"
                  />
                  <span className="relative z-10">SINCRONIZANDO...</span>
                </motion.div>
              ) : isSaved ? (
                <motion.div 
                  key="saved"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 relative z-10 text-emerald-400" />
                  <span className="relative z-10">ALTERAÇÕES GRAVADAS</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <Save className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span className="relative z-10">GRAVAR ALTERAÇÕES</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </motion.form>

    </motion.div>
  );
}
