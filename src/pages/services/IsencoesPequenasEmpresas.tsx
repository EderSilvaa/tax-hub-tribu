import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IsencoesPequenasEmpresas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
                Isenções para Pequenas Empresas
              </h1>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Garanta todos os benefícios fiscais que sua pequena empresa tem direito
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-6">
                  Benefícios Disponíveis
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Pequenas empresas têm direito a diversos benefícios fiscais que podem representar 
                    uma economia significativa. Nossa análise identifica todas as oportunidades aplicáveis ao seu negócio.
                  </p>
                  <p>
                    Verificamos se sua empresa está aproveitando todos os benefícios disponíveis e orientamos 
                    sobre como manter-se em conformidade para continuar usufruindo dessas vantagens.
                  </p>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-open-ring font-semibold text-foreground">
                    Principais Benefícios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Simples Nacional</h3>
                      <p className="text-sm text-muted-foreground">Regime tributário simplificado com alíquotas reduzidas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">MEI - Microempreendedor</h3>
                      <p className="text-sm text-muted-foreground">Tributação mínima para pequenos negócios</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Isenções Setoriais</h3>
                      <p className="text-sm text-muted-foreground">Benefícios específicos para diferentes atividades</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Benefícios Regionais</h3>
                      <p className="text-sm text-muted-foreground">Incentivos locais e regionais disponíveis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-4">
                Sua empresa está aproveitando todos os benefícios?
              </h2>
              <p className="text-muted-foreground mb-8">
                Agende uma consulta e descubra como reduzir legalmente sua carga tributária
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Verificar Benefícios Disponíveis
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IsencoesPequenasEmpresas;