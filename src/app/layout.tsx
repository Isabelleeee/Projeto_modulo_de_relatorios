import { Outlet, NavLink, useLocation } from "react-router";
import { LayoutDashboard, FileText, Users, Settings, LogOut, Hexagon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "motion/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const location = useLocation();
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Relatórios", icon: FileText, path: "/relatorios" },
    { label: "Integrantes", icon: Users, path: "/integrantes" },
    { label: "Configurações", icon: Settings, path: "/configuracoes" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#050505] text-zinc-300 font-sans overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* Deep Space Ambient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-indigo-900/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vh] rounded-full bg-cyan-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vh] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />

      {/* Grid Noise Texture (Subtle) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Sidebar - Obsidian Glass */}
      <aside className="w-64 my-4 ml-4 rounded-[2rem] bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col justify-between z-10 overflow-hidden ring-1 ring-white/[0.02] inset-ring inset-ring-white/[0.05]">
        <div className="pt-8">
          <div className="flex items-center px-8 mb-10">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] mr-4">
              <Hexagon className="w-6 h-6" />
              <div className="absolute inset-0 rounded-xl border border-white/20" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Mackenzie
            </span>
          </div>
          
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 group overflow-hidden",
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent rounded-2xl border-l-2 border-cyan-400"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <item.icon className={cn("w-5 h-5 relative z-10 transition-transform duration-300", isActive ? "scale-110 text-cyan-400" : "group-hover:scale-110")} />
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4 mb-2">
          <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-sm font-medium text-zinc-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 group">
            <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto z-10 px-4 py-4 scroll-smooth">
        <div className="flex-1 rounded-[2.5rem] overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
