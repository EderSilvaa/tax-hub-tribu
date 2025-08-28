import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Recuperação de Tributos",
      description: "Identifico tributos pagos a maior pela sua empresa e trabalho para recuperar esses valores, transformando isso em economia real.",
      features: ["Análise de recolhimentos", "Pedidos de restituição", "ICMS pago indevidamente", "PIS/COFINS recuperação"],
      href: "/servicos/recuperacao-tributos"
    },
    {
      title: "Isenções para Pequenas Empresas",
      description: "Analiso se sua empresa tem direito a isenções fiscais e benefícios tributários específicos para pequenos negócios.",
      features: ["Simples Nacional", "MEI - Microempreendedor", "Isenções setoriais", "Benefícios regionais"],
      href: "/servicos/isencoes-pequenas-empresas"
    },
    {
      title: "Consultoria Preventiva",
      description: "Orientação para evitar problemas fiscais futuros e garantir que sua empresa esteja sempre em dia com as obrigações.",
      features: ["Orientação fiscal", "Compliance básico", "Regularização", "Planejamento simples"],
      href: "/servicos/consultoria-preventiva"
    },
    {
      title: "Defesa em Autuações",
      description: "Represento sua empresa em fiscalizações e autuações, buscando reduzir ou anular multas e penalidades aplicadas.",
      features: ["Defesa administrativa", "Recursos", "Parcelamentos", "Negociação de débitos"],
      href: "/servicos/defesa-autuacoes"
    },
    {
      title: "Imposto de Renda",
      description: "Assessoria completa para declaração de IR de pessoas físicas e pequenas empresas, maximizando restituições.",
      features: ["Declaração de IR", "Restituição máxima", "Retificação", "Regularização CPF"],
      href: "/servicos/imposto-renda"
    },
    {
      title: "Consultoria Especializada",
      description: "Atendimento focado em pequenas empresas que precisam de orientação tributária clara e objetiva.",
      features: ["Análise personalizada", "Relatórios simples", "Orientação presencial", "Suporte contínuo"],
      href: "/servicos/consultoria-especializada"
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
            Soluções Tributárias
            <span className="block text-accent">Modernas & Eficazes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Foco em soluções práticas para recuperação tributária e economia fiscal, 
            especialmente para pequenas empresas e empreendedores.
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
            <h3 className="text-2xl font-semibold mb-4">Pronto para começar?</h3>
            <p className="text-muted-foreground mb-6">
              Agende uma consulta gratuita e descubra como podemos ajudar sua empresa.
            </p>
            <Button variant="gradient" size="xl" className="px-8 py-4 text-lg font-semibold shadow-glow">
              Agendar Consulta Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;