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
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground leading-tight">
                Sobre o Dr. Silva
              </h2>
              <div className="w-12 h-px bg-accent"></div>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
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
          
          <div className="mt-8 lg:mt-0">
            <Card className="bg-card border-border/30 hover:border-accent/20 transition-colors duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-medium text-foreground">
                    Especialidades
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {specializations.map((spec, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="justify-start p-2 text-xs font-light bg-muted/30 text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border/30">
                    <h4 className="font-medium text-foreground mb-3 text-sm">Formação</h4>
                    <div className="space-y-1 text-xs text-muted-foreground font-light">
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