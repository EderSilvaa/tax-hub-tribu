import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Software de Recuperação Tributária",
      description: "Plataforma inteligente que identifica automaticamente tributos pagos a maior e gera relatórios para recuperação de valores.",
      features: ["Análise automatizada", "Relatórios detalhados", "ICMS e PIS/COFINS", "Dashboard em tempo real"],
      href: "/servicos/software-recuperacao"
    },
    {
      title: "Sistema de Compliance Fiscal",
      description: "Software que monitora obrigações tributárias e mantém sua empresa sempre em conformidade com a legislação.",
      features: ["Calendário fiscal", "Alertas automáticos", "Controle de prazos", "Relatórios de compliance"],
      href: "/servicos/sistema-compliance"
    },
    {
      title: "Plataforma de Planejamento Tributário",
      description: "Ferramenta que simula cenários tributários e sugere a melhor estratégia fiscal para sua empresa.",
      features: ["Simulações fiscais", "Comparativo de regimes", "Projeções de economia", "Análise de viabilidade"],
      href: "/servicos/planejamento-tributario"
    },
    {
      title: "Acompanhamento Jurídico",
      description: "Após usar nossos softwares, oferecemos acompanhamento jurídico especializado para implementar as soluções identificadas.",
      features: ["Defesa administrativa", "Recursos e contestações", "Acompanhamento processual", "Consultoria jurídica"],
      href: "/servicos/acompanhamento-juridico"
    },
    {
      title: "Assessoria Contábil",
      description: "Serviços contábeis especializados em otimização tributária, complementando nossas soluções tecnológicas.",
      features: ["Escrituração fiscal", "Apuração de tributos", "Declarações obrigatórias", "Consultoria contábil"],
      href: "/servicos/assessoria-contabil"
    },
    {
      title: "Suporte Técnico Especializado",
      description: "Equipe dedicada para auxiliar na utilização dos softwares e implementação das estratégias tributárias.",
      features: ["Treinamento de usuários", "Suporte técnico 24h", "Implementação assistida", "Atualizações constantes"],
      href: "/servicos/suporte-tecnico"
    }
  ];

  return (
    <section className="py-24 gradient-subtle relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-subtle/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <Badge variant="gradient" size="lg" className="mb-6">
            Nossos Serviços
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6">
            Hub de Tecnologias
            <span className="block text-accent">Tributárias</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Softwares inovadores para otimização tributária, complementados por 
            acompanhamento jurídico e contábil especializado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover-lift cursor-pointer border-0 shadow-soft hover:shadow-glow bg-card/50 backdrop-blur-sm"
              onClick={() => window.location.href = service.href}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="glass" size="sm">
                    Serviço {index + 1}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-xl font-sans font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full text-accent hover:text-accent hover:bg-accent/10 group-hover:bg-accent/20 transition-all duration-300"
                  >
                    Saber Mais
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20 animate-scale-in">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Teste nossos softwares!</h3>
            <p className="text-muted-foreground mb-6">
              Experimente nossas soluções tecnológicas e descubra o potencial de economia da sua empresa.
            </p>
            <Button variant="gradient" size="xl" className="px-8 py-4 text-lg font-semibold shadow-glow">
              Começar Teste Gratuito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;