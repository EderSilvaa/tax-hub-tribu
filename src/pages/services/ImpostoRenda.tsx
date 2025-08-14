import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImpostoRenda = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-open-ring font-bold text-foreground mb-4">
                Imposto de Renda
              </h1>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Declaração completa com foco na máxima restituição legal
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-6">
                  Maximize sua restituição
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Nossa assessoria em Imposto de Renda vai além do simples preenchimento da declaração. 
                    Analisamos todas as possibilidades legais para maximizar sua restituição.
                  </p>
                  <p>
                    Verificamos todas as deduções possíveis, orientamos sobre investimentos com benefícios 
                    fiscais e garantimos que você não pague mais imposto do que deve.
                  </p>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-open-ring font-semibold text-foreground">
                    Serviços Inclusos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Declaração Completa</h3>
                      <p className="text-sm text-muted-foreground">Preenchimento cuidadoso de toda a declaração</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Análise de Deduções</h3>
                      <p className="text-sm text-muted-foreground">Identificação de todas as deduções possíveis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Retificação</h3>
                      <p className="text-sm text-muted-foreground">Correção de declarações já enviadas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Regularização CPF</h3>
                      <p className="text-sm text-muted-foreground">Resolução de pendências no CPF</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-open-ring font-semibold text-foreground mb-4">
                Sua declaração em boas mãos
              </h2>
              <p className="text-muted-foreground mb-8">
                Agende um horário e garanta que sua declaração seja feita com máxima eficiência
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Agendar Declaração
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImpostoRenda;