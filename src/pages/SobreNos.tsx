import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Users, Award, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                Sobre Nós
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                O Futuro do
                <span className="text-primary"> Direito Tributário</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Somos um hub inovador de direito tributário que combina expertise jurídica 
                com altas tecnologias para revolucionar sua experiência com tributos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contato">
                  <Button size="lg" className="w-full sm:w-auto">
                    Conheça Nossos Serviços
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Acesse Nosso Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Missão e Visão */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Nossa Missão
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Transformar a complexidade tributária em simplicidade através da 
                  tecnologia, oferecendo soluções inteligentes que otimizam processos 
                  e maximizam resultados para nossos clientes.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Acreditamos que a tecnologia deve servir às pessoas, tornando 
                  o direito tributário mais acessível, eficiente e estratégico.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">500+</h3>
                  <p className="text-sm text-muted-foreground">Clientes Atendidos</p>
                </Card>
                <Card className="p-6 text-center">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">15+</h3>
                  <p className="text-sm text-muted-foreground">Anos de Experiência</p>
                </Card>
                <Card className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">R$ 50M+</h3>
                  <p className="text-sm text-muted-foreground">Recuperados em Tributos</p>
                </Card>
                <Card className="p-6 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">24/7</h3>
                  <p className="text-sm text-muted-foreground">Suporte Digital</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Diferenciais */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Nossos Diferenciais
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Combinamos tradição jurídica com inovação tecnológica para entregar 
                resultados excepcionais.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Tecnologia de Ponta
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Utilizamos inteligência artificial, automação e analytics 
                    avançados para otimizar cada processo tributário.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Segurança Jurídica
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Todas as nossas soluções são fundamentadas em sólida 
                    base jurídica e compliance regulatório.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Atendimento Humanizado
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tecnologia potencializa, mas pessoas transformam. 
                    Nossa equipe está sempre ao seu lado.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nossa Abordagem */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Como Trabalhamos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossa metodologia integra o melhor da expertise jurídica com 
                ferramentas tecnológicas avançadas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Análise Digital
                </h3>
                <p className="text-muted-foreground">
                  Utilizamos IA para mapear oportunidades e riscos tributários.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Estratégia Personalizada
                </h3>
                <p className="text-muted-foreground">
                  Desenvolvemos soluções sob medida para seu perfil e necessidades.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Execução Automatizada
                </h3>
                <p className="text-muted-foreground">
                  Implementamos processos otimizados com acompanhamento em tempo real.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Monitoramento Contínuo
                </h3>
                <p className="text-muted-foreground">
                  Acompanhamos resultados e ajustamos estratégias constantemente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Pronto para Transformar sua Gestão Tributária?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubra como nossas soluções tecnológicas podem otimizar seus 
              processos tributários e maximizar seus resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button size="lg" className="w-full sm:w-auto">
                  Agende uma Consulta Gratuita
                </Button>
              </Link>
              <Link to="/servicos/consultoria-especializada">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Conheça Nossos Serviços
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SobreNos;