import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-planejamento-tributario.jpg";

const PlanejamentoTributario = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <article className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link to="/blog">
              <Button variant="outline" className="mb-8">
                <ArrowLeft size={16} className="mr-2" />
                Voltar ao Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Planejamento</Badge>
                <span className="text-sm text-muted-foreground">6 min de leitura</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Planejamento Tributário para Pequenas Empresas
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>5 de março de 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>TaxHub</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={blogImage} 
                alt="Planejamento Tributário" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                            [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:text-3xl [&_h2]:mt-8 [&_h2]:mb-6 [&_h2]:border-b-2 [&_h2]:border-primary [&_h2]:pb-2
                            [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-4
                            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-justify
                            [&_strong]:text-foreground [&_strong]:font-semibold">
                
                <p className="text-xl text-muted-foreground mb-8 text-center">
                  Estratégias eficazes para reduzir a carga tributária da sua empresa de forma legal e sustentável.
                </p>

                <p>
                  O planejamento tributário representa uma das mais importantes ferramentas de gestão empresarial disponível no cenário econômico brasileiro, constituindo elemento fundamental para a sustentabilidade e competitividade das organizações. Trata-se de um processo sistemático e contínuo de análise da legislação fiscal vigente, conjugado com o estudo detalhado das atividades empresariais, visando identificar alternativas legais que permitam a otimização da carga tributária. Esta prática, longe de constituir evasão fiscal, fundamenta-se no princípio constitucional da livre iniciativa e no direito de o contribuinte organizar seus negócios da forma mais eficiente possível.
                </p>

                <p>
                  A complexidade do sistema tributário brasileiro, caracterizado por múltiplas esferas de tributação e constantes alterações legislativas, torna o planejamento tributário não apenas uma oportunidade de otimização fiscal, mas uma necessidade estratégica para a sobrevivência empresarial. A carga tributária elevada que incide sobre as atividades produtivas no país exige que gestores adotem abordagem proativa na gestão fiscal, transformando o cumprimento das obrigações tributárias em vantagem competitiva através da eficiência e conformidade.
                </p>

                <p>
                  Os benefícios decorrentes de um planejamento tributário bem estruturado transcendem a simples redução de impostos, gerando impactos positivos em toda a cadeia de valor empresarial. A melhoria do fluxo de caixa resultante da otimização fiscal proporciona maior flexibilidade para investimentos em inovação, expansão e modernização tecnológica. Simultaneamente, a redução da carga tributária se traduz em maior competitividade no mercado, permitindo que empresas ofereçam preços mais atrativos ou ampliem suas margens de lucro sem comprometer sua posição competitiva.
                </p>

                <p>
                  A escolha do regime tributário constitui decisão estratégica fundamental que influencia diretamente a efetividade do planejamento fiscal. O Simples Nacional, concebido para favorecer micro e pequenas empresas com faturamento anual até R$ 4,8 milhões, oferece alíquotas progressivas e significativa simplificação nas obrigações acessórias. Contudo, sua aplicabilidade deve ser cuidadosamente avaliada considerando as restrições de atividades e os custos trabalhistas que permanecem integrais.
                </p>

                <p>
                  O Lucro Presumido apresenta-se como alternativa atrativa para empresas com margens de lucro superiores aos percentuais de presunção estabelecidos pela legislação. Este regime oferece previsibilidade tributária e simplificação contábil, sendo particularmente vantajoso para atividades com alta lucratividade. Por outro lado, o Lucro Real, embora mais complexo em termos de apuração e obrigações acessórias, permite o aproveitamento integral de despesas dedutíveis e prejuízos fiscais, sendo frequentemente mais vantajoso para empresas com estrutura de custos elevada ou resultados operacionais oscilantes.
                </p>

                <p>
                  As estratégias de planejamento tributário devem ser desenvolvidas considerando as especificidades setoriais e as características particulares de cada negócio. No setor comercial, a otimização frequentemente concentra-se na gestão do ICMS e na análise comparativa entre diferentes regimes tributários, considerando a margem de lucro das mercadorias comercializadas. Empresas industriais beneficiam-se significativamente do aproveitamento de créditos de IPI, ICMS, PIS e COFINS, além da exploração de incentivos fiscais regionais e setoriais que podem resultar em substancial economia tributária.
                </p>

                <p>
                  O setor de prestação de serviços apresenta características distintas que exigem abordagem especializada no planejamento tributário. A otimização do ISS, combinada com análise criteriosa da tributação incidente sobre a folha de pagamento, constitui elemento central para a eficiência fiscal neste segmento. A natureza específica de cada tipo de serviço prestado influencia diretamente as possibilidades de otimização, tornando essencial a análise individualizada de cada caso.
                </p>

                <p>
                  A sustentabilidade de qualquer estratégia de planejamento tributário depende fundamentalmente da observância rigorosa aos limites legais e jurisprudenciais estabelecidos. O conceito de substância econômica das operações assume papel central na avaliação da legitimidade das estratégias adotadas, exigindo que toda operação tenha propósito negocial genuíno além da economia tributária. A documentação adequada de todas as operações e decisões empresariais constitui elemento probatório essencial para demonstrar a boa-fé e a regularidade dos procedimentos adotados.
                </p>

                <h2>Dinamismo e Adaptabilidade Estratégica</h2>
                <p>
                  O planejamento tributário eficaz caracteriza-se pela dinamicidade e capacidade de adaptação às constantes mudanças do ambiente normativo e econômico. A revisão periódica das estratégias implementadas, idealmente realizada ao menos anualmente ou sempre que ocorrerem alterações significativas no negócio ou na legislação, garante que a otimização fiscal permaneça alinhada com os objetivos empresariais e em conformidade com as exigências legais. Esta abordagem proativa na gestão tributária não apenas assegura economia fiscal sustentável, mas também contribui para o fortalecimento da cultura de compliance dentro da organização, promovendo maior segurança jurídica e reputacional para a empresa.
                </p>

                <div className="bg-primary/5 rounded-lg p-6 mt-8">
                  <h3 className="font-semibold mb-2">Precisa de um Planejamento Tributário?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nossa equipe pode desenvolver estratégias personalizadas para reduzir a carga tributária da sua empresa.
                  </p>
                  <Link to="/contato">
                    <Button>Agende uma Consultoria</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PlanejamentoTributario;