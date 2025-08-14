import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConsultoriaPreventiva = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
                Consultoria Preventiva
              </h1>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Evite problemas fiscais antes que eles aconteçam
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-6">
                  Prevenção é o melhor remédio
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    É muito mais barato e eficiente prevenir problemas fiscais do que resolvê-los depois. 
                    Nossa consultoria preventiva mantém sua empresa sempre em dia com as obrigações tributárias.
                  </p>
                  <p>
                    Oferecemos orientação contínua para que você tome as decisões certas e evite armadilhas 
                    fiscais que podem custar caro no futuro.
                  </p>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-open-ring font-semibold text-foreground">
                    O que inclui
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Orientação Fiscal</h3>
                      <p className="text-sm text-muted-foreground">Orientações claras sobre obrigações e prazos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Compliance Básico</h3>
                      <p className="text-sm text-muted-foreground">Acompanhamento das principais obrigações</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Regularização</h3>
                      <p className="text-sm text-muted-foreground">Apoio para regularizar pendências existentes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Planejamento Simples</h3>
                      <p className="text-sm text-muted-foreground">Estratégias básicas de planejamento tributário</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-4">
                Mantenha sua empresa protegida
              </h2>
              <p className="text-muted-foreground mb-8">
                Agende uma consulta e garanta que sua empresa esteja sempre em conformidade
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Iniciar Consultoria Preventiva
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultoriaPreventiva;