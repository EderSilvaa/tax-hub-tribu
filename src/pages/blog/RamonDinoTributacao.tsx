import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AuthorCard from "@/components/blog/AuthorCard";
import { authors } from "@/data/authors";

const RamonDinoTributacao = () => {
  const author = authors["eder-silva"];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Header Section */}
        <div className="space-y-4 border-b border-border relative">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors group w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Blog
            </Link>

            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                Tributação Internacional
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <time dateTime="2024-10-16">16 de Outubro de 2024</time>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
              <span className="bg-gradient-to-r from-foreground via-accent to-accent-subtle bg-clip-text text-transparent">
                O Shape É Dele, Mas a Receita Quer a Parte: Como o Leão Vai Tributar o Ramon Dino
              </span>
            </h1>

            <p className="text-xl text-muted-foreground tracking-tight text-balance max-w-3xl">
              Ramon Dino conquistou o Mr. Olympia, mas enquanto o Brasil comemorava,
              a Receita Federal já calculava quanto aquele título valia em impostos.
            </p>

            <div className="pt-2">
              <AuthorCard author={author} />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-12 relative">
          <div className="col-span-12 lg:col-start-3 lg:col-span-8">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg p-6">

              <p className="lead">
                Ramon Dino subiu no palco do Mr. Olympia, levantou o troféu e o Brasil inteiro vibrou.
                Enquanto a galera comemorava o shape, a Receita Federal já calculava quanto aquele bíceps
                valia em reais. Porque sim, o Leão também assiste o campeonato — e ele não perdoa nem o pump.
              </p>

              <h2>O Atleta Como Empresa</h2>

              <p>
                Ser atleta profissional hoje é basicamente ser uma empresa ambulante. Ramon não vive só de troféus,
                mas de contratos, patrocínios, publicidade, venda de produtos e royalties de suplementos.
                Tudo isso é rendimento tributável. E como o campeonato aconteceu fora do país, o prêmio foi pago
                em dólar, mas continua sendo renda tributável no Brasil.
              </p>

              <p>
                É o que diz o <strong>artigo 43 do Código Tributário Nacional</strong>: a renda mundial de um
                residente brasileiro é tributável aqui. Ou seja, mesmo que o cheque venha de Las Vegas,
                o imposto é pago em Brasília.
              </p>

              <h2>A Conta do Título Mundial</h2>

              <p>
                O prêmio de <strong>50 mil dólares</strong>, convertido, dá mais ou menos 280 mil reais.
                Com a alíquota máxima de 27,5%, isso significa que quase <strong>77 mil reais</strong> do
                título mundial vão direto pro bolso do governo. E isso sem contar conversão cambial,
                contribuições e as outras mordidas que o sistema adora dar.
              </p>

              <blockquote>
                <p>
                  O problema não é o Ramon ganhar. O problema é o quanto ele precisa entender de tributação
                  pra não perder depois.
                </p>
              </blockquote>

              <p>
                E isso vale pra qualquer atleta, influenciador ou profissional que vive de performance.
                Enquanto nos Estados Unidos atletas podem deduzir despesas com nutrição, viagens e marketing,
                aqui o brasileiro que tentar abater o whey protein na declaração corre o risco de cair na
                malha fina. Lá o imposto entende o esforço. Aqui, ele pune o sucesso.
              </p>

              <h2>A Receita Está Ficando Mais Esperta</h2>

              <p>
                A situação fica mais interessante quando a gente lembra que a Receita Federal está ficando
                mais esperta. Desde 2024, o órgão vem usando <strong>inteligência artificial</strong> pra
                cruzar dados bancários, PIX, redes sociais e movimentações financeiras.
              </p>

              <p>
                O projeto, chamado <strong>RFB Analytics</strong>, já ajudou a identificar mais de
                <strong>11 bilhões de reais</strong> em esquemas de sonegação. Agora imagine um atleta
                que ganha prêmios no exterior, recebe patrocínios digitais e ainda vende e-books com
                treinos online. O algoritmo conecta tudo isso antes mesmo do assessor contábil perceber
                que precisa declarar.
              </p>

              <h2>O Problema da Transparência</h2>

              <p>
                O problema é que ninguém sabe exatamente como esses algoritmos decidem quem é "suspeito".
                O contribuinte é marcado por "padrões atípicos", mas ninguém explica qual é o padrão típico
                pra um campeão mundial. Essa falta de transparência é perigosa: um simples erro de leitura
                pode transformar um medalhista em alvo de investigação.
              </p>

              <p>
                O Brasil ainda trata quem ganha dinheiro fora do padrão como se fosse um potencial sonegador.
                O sistema tributário não premia quem exporta talento, e sim quem se encaixa na planilha.
              </p>

              <h2>O Paradoxo do Sucesso</h2>

              <p>
                Ramon Dino representa isso perfeitamente: o cara colocou o país no topo do mundo, mas agora
                vai ter que lidar com um labirinto de obrigações fiscais internacionais. Um erro de código
                na DARF pode custar mais do que uma preparação pro Olympia.
              </p>

              <p>
                E o mais irônico: o mesmo governo que exalta o atleta no marketing esportivo é o que vai
                tributar o troféu antes mesmo do brilho da medalha apagar.
              </p>

              <blockquote>
                <p>
                  O caso de Ramon não é só sobre academia. É sobre um país que ainda não sabe lidar com
                  o sucesso financeiro dos seus cidadãos.
                </p>
              </blockquote>

              <h2>A Reflexão Necessária</h2>

              <p>
                O Leão pode ter ganhado inteligência artificial e um novo visual digital, mas o olhar
                continua o mesmo: fiscalizar primeiro, entender depois. Enquanto isso, atletas viram PJs,
                criadores viram empresas, e o brasileiro médio tenta sobreviver sem ser devorado por um
                algoritmo.
              </p>

              <p>
                No fim das contas, o corpo é dele. Mas o imposto é coletivo.
              </p>

              <h2>Conclusão</h2>

              <p>
                Se o Brasil quer ser potência esportiva e digital, precisa aprender a tributar com
                inteligência, não com instinto predatório. A vitória de Ramon Dino é sobre disciplina,
                suor e foco. Mas também deveria nos fazer pensar sobre o direito de crescer sem medo
                de ser multado.
              </p>

              <p>
                O Leão pode até querer sua parte no shape, mas que pelo menos reconheça o esforço que
                construiu o troféu.
              </p>

              <hr />

              <div className="not-prose">
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    💡 Precisa de ajuda com tributação internacional?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Se você recebe rendimentos do exterior ou tem dúvidas sobre como declarar prêmios
                    e patrocínios internacionais, nossa equipe pode te ajudar.
                  </p>
                  <Link
                    to="/simulador"
                    className="inline-flex items-center text-accent hover:text-accent-subtle font-medium transition-colors"
                  >
                    Simule sua situação tributária →
                  </Link>
                </div>
              </div>

            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RamonDinoTributacao;
