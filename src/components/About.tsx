import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const specializations = [
    "Planejamento Tributário",
    "Contencioso Fiscal",
    "Compliance Tributário",
    "Consultoria ICMS",
    "Imposto de Renda",
    "Direito Aduaneiro"
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Sobre o Dr. Silva
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent/60"></div>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Com mais de 15 anos de experiência em Direito Tributário, Dr. Silva 
                consolidou-se como um dos principais especialistas da região, oferecendo 
                soluções estratégicas e eficientes para empresas e pessoas físicas.
              </p>
              
              <p>
                Graduado em Direito pela Universidade de São Paulo (USP) e pós-graduado 
                em Direito Tributário pela Fundação Getúlio Vargas (FGV), possui vasta 
                experiência tanto no contencioso quanto na consultoria preventiva.
              </p>
              
              <p>
                Seu compromisso é oferecer um atendimento personalizado, buscando sempre 
                as melhores alternativas legais para otimização tributária e resolução 
                de conflitos fiscais.
              </p>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-500 group">
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Especialidades
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {specializations.map((spec, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="justify-start p-3 text-sm bg-muted/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">Formação</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>• Graduação em Direito - USP</div>
                      <div>• Pós-graduação em Direito Tributário - FGV</div>
                      <div>• MBA em Gestão Tributária - IBMEC</div>
                      <div>• Membro da OAB/SP</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;