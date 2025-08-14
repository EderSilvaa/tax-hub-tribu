import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecuperacaoTributos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
                Recuperação de Tributos
              </h1>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transforme tributos pagos a maior em economia real para sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-6">
                  Como funciona?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Muitas empresas pagam tributos a maior sem perceber. Nossa análise especializada 
                    identifica essas oportunidades e trabalha para recuperar esses valores.
                  </p>
                  <p>
                    Realizamos uma auditoria completa dos seus recolhimentos dos últimos 5 anos, 
                    identificando pagamentos indevidos e solicitando a restituição junto aos órgãos competentes.
                  </p>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-open-ring font-semibold text-foreground">
                    Principais Recuperações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">ICMS Pago Indevidamente</h3>
                      <p className="text-sm text-muted-foreground">Recuperação de ICMS sobre energia elétrica, telecomunicações e outros</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">PIS/COFINS</h3>
                      <p className="text-sm text-muted-foreground">Recuperação de créditos não utilizados e exclusões da base de cálculo</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Multas Indevidas</h3>
                      <p className="text-sm text-muted-foreground">Contestação de multas aplicadas incorretamente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-4">
                Pronto para recuperar seus tributos?
              </h2>
              <p className="text-muted-foreground mb-8">
                Entre em contato para uma análise gratuita e descubra quanto sua empresa pode recuperar
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Solicitar Análise Gratuita
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RecuperacaoTributos;