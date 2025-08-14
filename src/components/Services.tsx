import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Foco em soluções práticas para recuperação tributária e economia fiscal, 
            especialmente para pequenas empresas e empreendedores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:bg-card-hover transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-open-ring font-semibold text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => window.location.href = service.href}
                  >
                    Saber Mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
            Agendar Consulta Gratuita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;