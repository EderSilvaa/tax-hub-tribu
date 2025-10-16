import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TaxIA from "./pages/TaxIA";
import RecuperacaoTributosService from "./pages/services/RecuperacaoTributos";
import IsencoesPequenasEmpresas from "./pages/services/IsencoesPequenasEmpresas";
import ConsultoriaPreventiva from "./pages/services/ConsultoriaPreventiva";
import DefesaAutuacoes from "./pages/services/DefesaAutuacoes";
import ImpostoRenda from "./pages/services/ImpostoRenda";
import ConsultoriaEspecializada from "./pages/services/ConsultoriaEspecializada";
import Blog from "./pages/Blog";
import LegislacaoTributaria2024 from "./pages/blog/LegislacaoTributaria2024";
import RecuperacaoTributosBlog from "./pages/blog/RecuperacaoTributos";
import PlanejamentoTributario from "./pages/blog/PlanejamentoTributario";
import RamonDinoTributacao from "./pages/blog/RamonDinoTributacao";
import SobreNos from "./pages/SobreNos";
import Simulador from "./pages/Simulador";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/taxia" element={<TaxIA />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/ramon-dino-tributacao" element={<RamonDinoTributacao />} />
          <Route path="/blog/legislacao-tributaria-2024" element={<LegislacaoTributaria2024 />} />
          <Route path="/blog/recuperacao-tributos" element={<RecuperacaoTributosBlog />} />
          <Route path="/blog/planejamento-tributario" element={<PlanejamentoTributario />} />
          <Route path="/servicos/recuperacao-tributos" element={<RecuperacaoTributosService />} />
          <Route path="/servicos/isencoes-pequenas-empresas" element={<IsencoesPequenasEmpresas />} />
          <Route path="/servicos/consultoria-preventiva" element={<ConsultoriaPreventiva />} />
          <Route path="/servicos/defesa-autuacoes" element={<DefesaAutuacoes />} />
          <Route path="/servicos/imposto-renda" element={<ImpostoRenda />} />
          <Route path="/servicos/consultoria-especializada" element={<ConsultoriaEspecializada />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
