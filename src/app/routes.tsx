import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "relatorios", Component: Reports },
      { path: "relatorios/:id", Component: ReportDetail },
      { path: "integrantes", Component: () => <div className="p-10 text-slate-500">Página de Integrantes (Em Breve)</div> },
      { path: "configuracoes", Component: Settings },
      { path: "*", Component: () => <div className="p-10 text-slate-500">Página não encontrada</div> },
    ],
  },
]);
