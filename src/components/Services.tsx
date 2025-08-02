import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "Planejamento Tributário",
      description: "Análise completa da estrutura tributária da sua empresa para otimização legal dos impostos e redução da carga fiscal.",
      features: ["Análise de regime tributário", "Estruturação societária", "Elisão fiscal", "Reorganização empresarial"]
    },
    {
      title: "Contencioso Fiscal",
      description: "Defesa em processos administrativos e judiciais, representação em órgãos fiscalizadores e recursos em todas as instâncias.",
      features: ["Defesa em autuações", "Recursos administrativos", "Ações judiciais", "Parcelamentos fiscais"]
    },
    {
      title: "Consultoria Especializada",
      description: "Assessoria preventiva e consultiva em questões tributárias complexas, garantindo compliance e segurança jurídica.",
      features: ["Pareceres técnicos", "Due diligence tributária", "Compliance fiscal", "Consultoria ICMS/IPI"]
    },
    {
      title: "Recuperação de Créditos",
      description: "Identificação e recuperação de créditos tributários indevidos, repetição de indébito e compensações fiscais.",
      features: ["Análise de recolhimentos", "Pedidos de restituição", "Compensações", "Precatórios"]
    },
    {
      title: "Pessoa Física",
      description: "Assessoria tributária completa para pessoas físicas, incluindo Imposto de Renda e planejamento sucessório.",
      features: ["Declaração de IR", "Planejamento sucessório", "Investimentos", "Regularização fiscal"]
    },
    {
      title: "Direito Aduaneiro",
      description: "Consultoria especializada em comércio exterior, classificação fiscal e regimes aduaneiros especiais.",
      features: ["Importação/Exportação", "Classificação NCM", "Regimes especiais", "Defesa aduaneira"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas em Direito Tributário, desde consultoria preventiva 
            até representação em contenciosos complexos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:bg-card-hover transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
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