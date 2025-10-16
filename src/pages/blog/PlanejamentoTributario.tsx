import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-planejamento-tributario.jpg";
import AuthorCard from "@/components/blog/AuthorCard";
import { getAuthor } from "@/data/authors";

const PlanejamentoTributario = () => {
  const author = getAuthor("maria-contadora");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Header Section */}
        <div className="space-y-4 border-b border-border relative">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
              <Link to="/blog">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="sr-only">Voltar</span>
                </Button>
              </Link>

              <Badge variant="secondary">Planejamento</Badge>

              <time className="font-medium text-muted-foreground">
                5 de março de 2024
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
              Planejamento Tributário para Pequenas Empresas
            </h1>

            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              Estratégias legais para reduzir a carga tributária e otimizar os resultados da sua empresa.
            </p>

            {/* Author Info */}
            <div className="pt-2">
              <AuthorCard author={author} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0">
          <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />

          <article className="w-full p-0 overflow-hidden">
            {/* Featured Image */}
            <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
              <img
                src={blogImage}
                alt="Planejamento Tributário"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Article Body */}
            <div className="p-6 lg:p-10">
              <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">

                <p>
                  O planejamento tributário representa uma das mais importantes ferramentas de gestão empresarial disponível no cenário econômico brasileiro, constituindo elemento fundamental para a sustentabilidade e competitividade das organizações. Trata-se de um processo sistemático e contínuo de análise da legislação fiscal vigente, conjugado com o estudo detalhado das atividades empresariais, visando identificar alternativas legais que permitam a otimização da carga tributária.
                </p>

                <p>
                  A complexidade do sistema tributário brasileiro, caracterizado por múltiplas esferas de tributação e constantes alterações legislativas, torna o planejamento tributário não apenas uma oportunidade de otimização fiscal, mas uma necessidade estratégica para a sobrevivência empresarial. A carga tributária elevada que incide sobre as atividades produtivas no país exige que gestores adotem abordagem proativa na gestão fiscal.
                </p>

                <p>
                  Os benefícios decorrentes de um planejamento tributário bem estruturado transcendem a simples redução de impostos, gerando impactos positivos em toda a cadeia de valor empresarial. A melhoria do fluxo de caixa resultante da otimização fiscal proporciona maior flexibilidade para investimentos em inovação, expansão e modernização tecnológica.
                </p>

                <p>
                  A escolha do regime tributário constitui decisão estratégica fundamental que influencia diretamente a efetividade do planejamento fiscal. O Simples Nacional, concebido para favorecer micro e pequenas empresas com faturamento anual até R$ 4,8 milhões, oferece alíquotas progressivas e significativa simplificação nas obrigações acessórias.
                </p>

                <p>
                  O Lucro Presumido apresenta-se como alternativa atrativa para empresas com margens de lucro superiores aos percentuais de presunção estabelecidos pela legislação. Este regime oferece previsibilidade tributária e simplificação contábil, sendo particularmente vantajoso para atividades com alta lucratividade.
                </p>

                <p>
                  As estratégias de planejamento tributário devem ser desenvolvidas considerando as especificidades setoriais e as características particulares de cada negócio. No setor comercial, a otimização frequentemente concentra-se na gestão do ICMS e na análise comparativa entre diferentes regimes tributários, considerando a margem de lucro das mercadorias comercializadas.
                </p>

                <p>
                  O setor de prestação de serviços apresenta características distintas que exigem abordagem especializada no planejamento tributário. A otimização do ISS, combinada com análise criteriosa da tributação incidente sobre a folha de pagamento, constitui elemento central para a eficiência fiscal neste segmento.
                </p>

                <p>
                  A sustentabilidade de qualquer estratégia de planejamento tributário depende fundamentalmente da observância rigorosa aos limites legais e jurisprudenciais estabelecidos. O conceito de substância econômica das operações assume papel central na avaliação da legitimidade das estratégias adotadas.
                </p>

                <h2>Dinamismo e Adaptabilidade Estratégica</h2>

                <p>
                  O planejamento tributário eficaz caracteriza-se pela dinamicidade e capacidade de adaptação às constantes mudanças do ambiente normativo e econômico. A revisão periódica das estratégias implementadas garante que a otimização fiscal permaneça alinhada com os objetivos empresariais e em conformidade com as exigências legais.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="px-6 lg:px-10 pb-10">
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Precisa de um Planejamento Tributário?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe pode desenvolver estratégias personalizadas para reduzir a carga tributária
                  da sua empresa de forma legal e sustentável.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contato" className="flex-1">
                    <Button className="w-full" size="lg">
                      Agende uma Consultoria
                    </Button>
                  </Link>
                  <Link to="/blog" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      Ver Mais Artigos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlanejamentoTributario;
