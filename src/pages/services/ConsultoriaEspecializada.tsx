import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConsultoriaEspecializada = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
                Consultoria Especializada
              </h1>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Atendimento personalizado focado em pequenas empresas
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-6">
                  Atendimento sob medida
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Cada empresa tem suas particularidades. Nossa consultoria especializada oferece 
                    soluções personalizadas que consideram a realidade específica do seu negócio.
                  </p>
                  <p>
                    Trabalhamos de forma próxima, com linguagem clara e objetiva, focando nas necessidades 
                    reais de pequenas empresas e empreendedores.
                  </p>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-open-ring font-semibold text-foreground">
                    Diferenciais do Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Análise Personalizada</h3>
                      <p className="text-sm text-muted-foreground">Estudo específico da sua situação tributária</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Relatórios Simples</h3>
                      <p className="text-sm text-muted-foreground">Documentação clara e de fácil compreensão</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Orientação Presencial</h3>
                      <p className="text-sm text-muted-foreground">Atendimento presencial quando necessário</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Suporte Contínuo</h3>
                      <p className="text-sm text-muted-foreground">Acompanhamento regular das suas necessidades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-4">
                Vamos conversar sobre seu negócio?
              </h2>
              <p className="text-muted-foreground mb-8">
                Agende uma consulta personalizada e descubra como podemos ajudar sua empresa
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Agendar Consultoria Personalizada
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultoriaEspecializada;