import { useState } from "react";
import { Plus, Search, Filter, CheckCircle2, FileText, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

const MOCK_REPORTS = [
  { id: 1, name: "Sprint 14 - Análise de Requisitos", date: "15 Abr 2026", source: "spec_v2.pdf", status: "Concluído", confidence: 98 },
  { id: 2, name: "Avaliação de Risco Q2", date: "10 Abr 2026", source: "risks_q2.md", status: "Concluído", confidence: 92 },
  { id: 3, name: "Revisão de Arquitetura", date: "05 Abr 2026", source: "arch_doc.pdf", status: "Concluído", confidence: 85 },
  { id: 4, name: "Roadmap e Métricas", date: "01 Abr 2026", source: "roadmap_2026.pdf", status: "Concluído", confidence: 78 },
  { id: 5, name: "Avaliação de Segurança", date: "28 Mar 2026", source: "sec_audit.md", status: "Concluído", confidence: 95 },
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredReports = MOCK_REPORTS.filter((report) => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      className="flex-1 w-full max-w-6xl mx-auto px-12 py-16 h-full flex flex-col gap-12"
    >
      
      {/* Header */}
      <motion.header variants={itemVariant} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] -z-10" />
        <div>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight flex items-center gap-4">
            Histórico <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Neural</span>
            <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          </h1>
          <p className="text-zinc-400 mt-4 text-lg font-light">
            Repositório criptografado de análises cognitivas e relatórios do projeto Mackenzie.
          </p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, shadow: "0 0 30px rgba(34,211,238,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-[13px] font-bold tracking-wide hover:bg-zinc-200 transition-all shadow-xl whitespace-nowrap relative overflow-hidden group border border-white/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Plus className="w-5 h-5 relative z-10 text-indigo-600" />
          <span className="relative z-10">NOVO RELATÓRIO</span>
        </motion.button>
      </motion.header>

      {/* Toolbar (Search & Filter) */}
      <motion.div variants={itemVariant} className="flex gap-4 items-center w-full mt-4">
        <div className="relative flex-1 max-w-xl group">
          <div className="absolute inset-0 bg-cyan-900/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 -z-10" />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text"
            placeholder="Buscar por nome ou artefato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-5 py-4 bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/[0.05] rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all shadow-2xl"
          />
        </div>
        <button className="flex items-center gap-3 px-8 py-4 border border-white/[0.05] bg-[#0A0A0A]/60 backdrop-blur-2xl rounded-2xl text-sm font-bold tracking-wide text-zinc-300 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.02] transition-all shadow-2xl">
          <Filter className="w-5 h-5 text-zinc-500" />
          FILTROS
        </button>
      </motion.div>

      {/* Table Area (Card List) */}
      <motion.div variants={itemVariant} className="flex flex-col gap-4 relative z-10">
        <div className="grid grid-cols-12 gap-6 px-8 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 border-b border-white/[0.05]">
          <div className="col-span-5">Nomenclatura do Relatório</div>
          <div className="col-span-2">Data de Geração</div>
          <div className="col-span-3">Artefato Base</div>
          <div className="col-span-2">Status do Nó</div>
        </div>

        <AnimatePresence>
          {filteredReports.map((report) => (
            <motion.div 
              key={report.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -3, scale: 1.005, backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}
              onClick={() => navigate(`/relatorios/${report.id}`)}
              className="grid grid-cols-12 gap-6 items-center px-8 py-6 bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/[0.02] rounded-3xl shadow-2xl cursor-pointer group transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="col-span-5 flex items-center gap-5 relative z-10">
                <div className="p-3.5 bg-white/[0.03] text-zinc-400 rounded-[1.25rem] border border-white/[0.05] group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-500 shadow-inner">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-200 group-hover:text-white transition-colors text-[15px] tracking-tight">
                    {report.name}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1 flex items-center gap-2">
                    Certeza Analítica: 
                    <span className="text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-500/20">{report.confidence}%</span>
                  </p>
                </div>
              </div>
              
              <div className="col-span-2 text-[13px] text-zinc-400 font-medium relative z-10">
                {report.date}
              </div>
              
              <div className="col-span-3 relative z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/[0.03] text-zinc-300 shadow-inner border border-white/[0.05]">
                  {report.source}
                </span>
              </div>
              
              <div className="col-span-2 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500 blur-[8px] opacity-40 rounded-full group-hover:opacity-60 transition-opacity duration-300" />
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 relative z-10" />
                  </div>
                  <span className="text-[10px] font-black text-emerald-400/90 uppercase tracking-[0.15em]">
                    {report.status}
                  </span>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all duration-500 -translate-x-6 group-hover:translate-x-0 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredReports.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-20 text-center text-zinc-500 text-sm font-medium bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/[0.02] rounded-3xl"
          >
            Nenhum log encontrado para a query "{searchTerm}".
          </motion.div>
        )}
      </motion.div>

    </motion.div>
  );
}
