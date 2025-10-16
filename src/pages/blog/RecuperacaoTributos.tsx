import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-recuperacao-tributos.jpg";
import AuthorCard from "@/components/blog/AuthorCard";
import { getAuthor } from "@/data/authors";

const RecuperacaoTributos = () => {
  const author = getAuthor("joao-consultor");

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

              <Badge variant="secondary">Recuperação</Badge>

              <time className="font-medium text-muted-foreground">
                10 de março de 2024
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
              Como Recuperar Tributos Pagos Indevidamente
            </h1>

            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              Guia completo sobre o processo de recuperação de tributos e os documentos necessários.
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
                alt="Recuperação de Tributos"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Article Body */}
            <div className="p-6 lg:p-10">
              <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">

                <p>
                  A recuperação de tributos representa uma das ferramentas mais eficazes de gestão fiscal disponível às empresas brasileiras, constituindo um mecanismo legítimo de correção de pagamentos realizados em desconformidade com a legislação tributária. Este processo, fundamentado em princípios constitucionais, permite que contribuintes revertam situações de oneração fiscal indevida.
                </p>

                <p>
                  O conceito de indébito tributário abrange uma gama diversificada de situações que transcendem o simples erro de cálculo. Frequentemente, contribuintes realizam recolhimentos baseados em interpretações conservadoras da legislação, pagamentos em duplicidade decorrentes de falhas sistêmicas, ou ainda aplicam entendimentos normativos posteriormente modificados pela jurisprudência.
                </p>

                <p>
                  Entre os tributos que apresentam maior potencial de recuperação, destaca-se o ICMS em operações envolvendo energia elétrica e telecomunicações, onde interpretações divergentes sobre a base de cálculo têm gerado substanciais oportunidades de restituição. O PIS e a COFINS, especialmente no que se refere ao aproveitamento de créditos sobre insumos, constituem outra fonte importante de recuperação.
                </p>

                <p>
                  O processo de recuperação tributária demanda metodologia rigorosa e conhecimento especializado. Inicia-se com uma análise minuciosa da situação fiscal do contribuinte, envolvendo o exame detalhado de demonstrações contábeis, declarações fiscais e documentos de arrecadação. Esta fase diagnóstica é crucial para identificar os valores efetivamente pagos em excesso.
                </p>

                <p>
                  A dimensão temporal assume papel crítico no processo de recuperação tributária. O prazo prescricional de cinco anos, contado da data do pagamento indevido, estabelece um limite temporal para o exercício do direito à restituição. A observância rigorosa desses prazos é fundamental para preservar o direito à recuperação.
                </p>

                <p>
                  Os benefícios econômicos da recuperação tributária estendem-se muito além da simples devolução de valores pagos indevidamente. A melhoria imediata do fluxo de caixa proporciona maior flexibilidade financeira para investimentos em expansão, modernização tecnológica ou capital de giro.
                </p>

                <p>
                  A documentação adequada constitui o alicerce de qualquer processo de recuperação bem-sucedido. Guias de recolhimento, declarações fiscais, livros contábeis e fiscais formam o conjunto probatório necessário para demonstrar a ocorrência do pagamento indevido.
                </p>

                <h2>Perspectivas e Considerações Estratégicas</h2>

                <p>
                  A recuperação de tributos transcende a mera correção de pagamentos indevidos, constituindo elemento estratégico da gestão tributária empresarial. Em um ambiente de constante evolução normativa e jurisprudencial, a identificação proativa de oportunidades de recuperação representa diferencial competitivo significativo.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="px-6 lg:px-10 pb-10">
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Quer Recuperar Seus Tributos?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe pode fazer uma análise gratuita dos seus recolhimentos e identificar
                  oportunidades de recuperação tributária de forma rápida e eficiente.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contato" className="flex-1">
                    <Button className="w-full" size="lg">
                      Solicite uma Análise Gratuita
                    </Button>
                  </Link>
                  <Link to="/simulador" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      Usar Simulador
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

export default RecuperacaoTributos;
