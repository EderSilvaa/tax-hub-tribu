import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-legislacao-tributaria.jpg";
import AuthorCard from "@/components/blog/AuthorCard";
import { getAuthor } from "@/data/authors";

const LegislacaoTributaria2024 = () => {
  const author = getAuthor("eder-silva");

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

              <Badge variant="secondary">Legislação</Badge>

              <time className="font-medium text-muted-foreground">
                15 de março de 2024
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
              Principais Mudanças na Legislação Tributária de 2024
            </h1>

            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              Entenda as principais alterações que impactam empresas e pessoas físicas neste ano.
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
                alt="Legislação Tributária 2024"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Article Body */}
            <div className="p-6 lg:p-10">
              <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">

                <p>
                  O cenário tributário brasileiro passou por transformações significativas em 2024, estabelecendo um marco na modernização do sistema fiscal nacional. As mudanças implementadas refletem a necessidade do governo de adequar a legislação tributária às novas realidades econômicas e tecnológicas, buscando simultaneamente aumentar a eficiência na arrecadação e promover maior transparência nas relações entre fisco e contribuintes.
                </p>

                <p>
                  No âmbito do Imposto de Renda pessoa física, as alterações introduzidas representam uma reformulação estrutural que afeta diretamente milhões de brasileiros. A elevação da faixa de isenção constitui uma medida de impacto social relevante, proporcionando alívio fiscal para a classe média baixa. Paralelamente, as modificações nas regras de dedução exigem maior atenção dos contribuintes, especialmente no que se refere às despesas médicas e educacionais, que passaram por ajustes em seus limites e modalidades de comprovação.
                </p>

                <p>
                  A extensão dos prazos para entrega da declaração anual, embora aparentemente benéfica, traz consigo a responsabilidade de maior rigor na fiscalização. O fisco implementou sistemas mais sofisticados de cruzamento de dados, tornando essencial que os contribuintes mantenham registros precisos e atualizados de suas movimentações financeiras. Ademais, as novas obrigações relacionadas a investimentos no exterior refletem a crescente internacionalização da economia brasileira e a necessidade de controle mais efetivo sobre os capitais nacionais aplicados em outros países.
                </p>

                <p>
                  Para o segmento empresarial, as transformações assumem proporções ainda mais complexas. O Simples Nacional, regime que beneficia pequenas e médias empresas, passou por ajustes em suas alíquotas e critérios de enquadramento, exigindo reavaliação estratégica por parte dos empresários. Essas mudanças visam corrigir distorções identificadas ao longo dos anos e promover maior equidade entre os diferentes portes empresariais.
                </p>

                <p>
                  A tributação do comércio eletrônico ganhou contornos mais definidos com as alterações no ICMS, estabelecendo regras mais claras para operações interestaduais e criando mecanismos de controle mais eficientes. Essa evolução normativa era esperada pelo setor, que vivenciava incertezas jurídicas que prejudicavam o planejamento empresarial e geravam conflitos entre os diferentes estados da federação.
                </p>

                <p>
                  O fenômeno PIX revolucionou não apenas os meios de pagamento, mas também os mecanismos de controle fiscal. O monitoramento automatizado de transações acima de determinados valores representa um salto qualitativo na capacidade de fiscalização da Receita Federal. Essa inovação tecnológica permite identificar inconsistências patrimoniais com maior agilidade e precisão, tornando fundamental que contribuintes mantenham coerência entre suas declarações e movimentações financeiras efetivas.
                </p>

                <p>
                  Diante desse panorama de transformações, a preparação adequada torna-se imperativa para todos os contribuintes. A revisão dos processos internos de controle fiscal não pode mais ser vista como uma opção, mas sim como uma necessidade estratégica. A atualização de sistemas de gestão deve contemplar as novas exigências legais, garantindo que informações sejam coletadas, organizadas e reportadas de acordo com os novos padrões estabelecidos.
                </p>

                <h2>Reflexões Finais</h2>

                <p>
                  As mudanças na legislação tributária de 2024 consolidam uma nova era nas relações entre fisco e contribuintes, caracterizada pela digitalização, transparência e eficiência. Embora representem desafios adaptativos iniciais, essas transformações prometem um sistema tributário mais justo e moderno. A busca por orientação profissional especializada deixa de ser um diferencial para se tornar uma necessidade, considerando a complexidade crescente das obrigações fiscais e as consequências cada vez mais severas do descumprimento das normas tributárias.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="px-6 lg:px-10 pb-10">
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Precisa de Ajuda com Planejamento Tributário?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe especializada pode ajudar sua empresa a se adequar às novas regras tributárias
                  e otimizar sua carga fiscal de forma legal e eficiente.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contato" className="flex-1">
                    <Button className="w-full" size="lg">
                      Entre em Contato
                    </Button>
                  </Link>
                  <Link to="/simulador" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      Experimente o Simulador
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

export default LegislacaoTributaria2024;
