import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DefesaAutuacoes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
                Defesa em Autuações
              </h1>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Representação especializada em fiscalizações e autuações fiscais
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-6">
                  Sua defesa em boas mãos
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Recebeu uma autuação fiscal? Não entre em pânico. Com a defesa adequada, 
                    é possível reduzir significativamente ou até mesmo anular multas e penalidades.
                  </p>
                  <p>
                    Nossa experiência em defesas administrativas garante que todos os seus direitos 
                    sejam preservados e que você tenha as melhores chances de sucesso.
                  </p>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-open-ring font-semibold text-foreground">
                    Tipos de Defesa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Defesa Administrativa</h3>
                      <p className="text-sm text-muted-foreground">Contestação de autuações nos órgãos competentes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Recursos</h3>
                      <p className="text-sm text-muted-foreground">Apresentação de recursos em todas as instâncias</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Parcelamentos</h3>
                      <p className="text-sm text-muted-foreground">Negociação de parcelamentos favoráveis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Negociação de Débitos</h3>
                      <p className="text-sm text-muted-foreground">Acordos para redução de valores e multas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-4">
                Precisa de defesa urgente?
              </h2>
              <p className="text-muted-foreground mb-8">
                Entre em contato imediatamente. Prazos de defesa são curtos e não podem ser perdidos
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Solicitar Defesa Urgente
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DefesaAutuacoes;