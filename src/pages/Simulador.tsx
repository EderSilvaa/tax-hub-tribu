/**
 * Simulador Page - Página principal do simulador tributário
 *
 * Segue o design system TaxHub:
 * - Cores: accent, accent-subtle, muted-foreground
 * - Typography: font-sans, tracking-tight
 * - Animações: animate-fade-in, animate-slide-up
 * - Componentes: glass, shadow-soft, gradient-primary
 */

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Shield, Zap } from "lucide-react";
import TaxSimulator from "@/features/taxSimulator/components/TaxSimulator";

const Simulador = () => {
  const [showSimulator, setShowSimulator] = useState(false);

  const handleStartSimulation = () => {
    setShowSimulator(true);
  };

  const handleBackToLanding = () => {
    setShowSimulator(false);
  };

  if (showSimulator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20">
          <TaxSimulator
            className="px-6 lg:px-8"
            onSaveSimulation={(data, results) => {
              console.log('Simulação salva:', { data, results });
            }}
            onShareResults={(results) => {
              console.log('Compartilhar resultados:', results);
            }}
            onExportPDF={(data, results) => {
              console.log('Exportar PDF:', { data, results });
            }}
          />

          <div className="text-center py-8">
            <Button
              variant="outline"
              onClick={handleBackToLanding}
              className="shadow-soft"
            >
              ← Voltar à página inicial
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-subtle relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-subtle/5 rounded-full blur-3xl animate-pulse-glow" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <Badge variant="gradient" size="lg" className="mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              Simulador Tributário
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-none mb-6">
              <span className="bg-gradient-to-r from-foreground via-accent to-accent-subtle bg-clip-text text-transparent">
                Simule e Compare
              </span>
              <br />
              <span className="text-foreground">Regimes Tributários</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Descubra qual regime tributário oferece a maior economia para sua empresa.
              Simulação em tempo real com cálculos precisos e recomendações personalizadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                variant="gradient"
                size="xl"
                className="px-8 py-4 font-semibold shadow-glow hover-lift"
                onClick={handleStartSimulation}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Iniciar Simulação
              </Button>
              <Button
                variant="glass"
                size="xl"
                className="px-8 py-4 font-semibold hover-lift"
              >
                Ver Exemplo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-sans font-semibold tracking-tight mb-6">
              Por que usar nosso simulador?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tecnologia avançada para análises precisas e recomendações personalizadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            {[
              {
                icon: TrendingUp,
                title: "Economia Garantida",
                description: "Identifique oportunidades de economia tributária em minutos",
                color: "text-accent"
              },
              {
                icon: Zap,
                title: "Resultados Instantâneos",
                description: "Cálculos em tempo real com precisão matemática",
                color: "text-accent-subtle"
              },
              {
                icon: Shield,
                title: "100% Seguro",
                description: "Seus dados são protegidos e nunca compartilhados",
                color: "text-accent"
              },
              {
                icon: Calculator,
                title: "Múltiplos Cenários",
                description: "Compare todos os regimes tributários disponíveis",
                color: "text-accent-subtle"
              }
            ].map((benefit, index) => (
              <Card
                key={index}
                className="group hover-lift cursor-pointer border-0 shadow-soft hover:shadow-glow bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-2xl bg-accent/10 w-fit">
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <CardTitle className="text-lg font-sans font-semibold tracking-tight">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 gradient-subtle">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-sans font-semibold tracking-tight mb-6">
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Processo simples e rápido para descobrir sua melhor opção tributária
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {[
              {
                step: "01",
                title: "Insira seus dados",
                description: "Faturamento, atividade e informações básicas da empresa"
              },
              {
                step: "02",
                title: "Análise automática",
                description: "Nossa IA calcula todos os regimes tributários disponíveis"
              },
              {
                step: "03",
                title: "Receba recomendações",
                description: "Compare resultados e escolha a melhor estratégia fiscal"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-accent to-accent-subtle flex items-center justify-center shadow-glow">
                    <span className="text-lg font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              variant="gradient"
              size="xl"
              className="px-8 py-4 font-semibold shadow-glow hover-lift"
              onClick={handleStartSimulation}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Começar Agora - É Grátis
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 animate-scale-in">
            <h2 className="text-3xl lg:text-4xl font-sans font-bold tracking-tight mb-6">
              Pronto para economizar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Junte-se a centenas de empresas que já descobriram como economizar
              milhares de reais em impostos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                variant="gradient"
                size="xl"
                className="px-8 py-4 font-semibold shadow-glow hover-lift"
                onClick={handleStartSimulation}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Simular Agora
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="px-8 py-4 font-semibold hover-lift"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Simulador;