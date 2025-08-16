import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RecuperacaoTributos from "./pages/services/RecuperacaoTributos";
import IsencoesPequenasEmpresas from "./pages/services/IsencoesPequenasEmpresas";
import ConsultoriaPreventiva from "./pages/services/ConsultoriaPreventiva";
import DefesaAutuacoes from "./pages/services/DefesaAutuacoes";
import ImpostoRenda from "./pages/services/ImpostoRenda";
import ConsultoriaEspecializada from "./pages/services/ConsultoriaEspecializada";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/servicos/recuperacao-tributos" element={<RecuperacaoTributos />} />
          <Route path="/servicos/isencoes-pequenas-empresas" element={<IsencoesPequenasEmpresas />} />
          <Route path="/servicos/consultoria-preventiva" element={<ConsultoriaPreventiva />} />
          <Route path="/servicos/defesa-autuacoes" element={<DefesaAutuacoes />} />
          <Route path="/servicos/imposto-renda" element={<ImpostoRenda />} />
          <Route path="/servicos/consultoria-especializada" element={<ConsultoriaEspecializada />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
