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

            <div className="flex items-center gap-4 pt-4">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-muted-foreground">Por</p>
                <p className="text-base font-medium text-foreground">{author.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-12 relative">
          <div className="col-span-12 lg:col-start-3 lg:col-span-8">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg p-6">

              <h2>O Atleta Como Empresa</h2>

              <p>
                Ramon Dino acabou de fazer história. Primeiro brasileiro a conquistar o título do Mr. Olympia na categoria Classic Physique, troféu na mão, foto com a bandeira, aquele momento de glória que o país inteiro esperava. Mas enquanto a galera comemora nas redes sociais, tem uma entidade que já está de olho no prêmio de 100 mil dólares: a Receita Federal.
              </p>

              <p>
                Porque ser atleta profissional hoje não é só sobre treino e dieta. É sobre entender que você virou uma empresa. Ramon não vive só de troféus — vive de contratos, patrocínios, publis no Instagram, venda de planilhas e royalties de suplementos. Tudo isso gera renda. E renda, meu amigo, é algo que o Leão adora farejar.
              </p>

              <p>
                O campeonato foi nos Estados Unidos, o prêmio veio em dólar, mas isso não muda nada. O artigo 43, § 1º do Código Tributário Nacional (incluído pela Lei Complementar nº 104/2001) é cristalino: a incidência do imposto independe da localização, da nacionalidade da fonte e da origem do rendimento. Se você é residente brasileiro, sua renda mundial é tributável aqui. Pode ter ganhado em Las Vegas, Dubai ou na Lua — o imposto é pago em Brasília.
              </p>

              <h2>O labirinto tributário do atleta internacional</h2>

              <p>
                Aqui é onde a coisa fica tecnicamente complicada. Ramon recebeu 100 mil dólares nos Estados Unidos. Primeiro, os americanos já retêm 30% na fonte (isso mesmo, 30 mil dólares ficam lá) porque Brasil e EUA não têm tratado de bitributação. Sobram 70 mil dólares que chegam de fato na conta dele.
              </p>

              <p>
                Mas a história não acaba aí. Quando Ramon for declarar esse prêmio no Brasil, ele precisa usar o carnê-leão, aquele sistema de recolhimento mensal obrigatório para rendimentos do exterior. O valor deve ser informado na ficha "Rendimentos Tributáveis Recebidos de Pessoa Física/Exterior", com conversão usando a cotação do Banco Central do último dia útil da primeira quinzena do mês anterior ao recebimento.
              </p>

              <p>
                Vamos aos números reais. Assumindo uma cotação de R$ 5,60 por dólar (próxima da atual), os 100 mil dólares viram 560 mil reais na declaração brasileira. Sobre esse valor total, aplica-se a tabela progressiva, com alíquota máxima de 27,5%. O que dá 154 mil reais de imposto devido ao Brasil.
              </p>

              <p>
                E aqui vem o golpe: existe sim um mecanismo de compensação (o Ato Declaratório SRF nº 28/2000 permite deduzir o imposto pago nos EUA). Mas tem um detalhe cruel: essa compensação só vale até o limite do imposto brasileiro. Os 30 mil dólares retidos pelos americanos valem 168 mil reais na conversão. Como o Brasil cobra "apenas" 154 mil reais, Ramon pode compensar esse valor todo. Mas os 14 mil reais de diferença? Perdidos. Não voltam, não podem ser usados em anos futuros, não servem pra nada.
              </p>

              <p>
                Resultado final da operação:
              </p>

              <ul>
                <li><strong>Prêmio bruto:</strong> US$ 100.000 (R$ 560.000)</li>
                <li><strong>Retido nos EUA:</strong> US$ 30.000 (R$ 168.000)</li>
                <li><strong>Imposto devido no Brasil:</strong> R$ 154.000</li>
                <li><strong>Compensação permitida:</strong> R$ 154.000</li>
                <li><strong>Perda permanente por excesso:</strong> R$ 14.000</li>
                <li><strong>Valor líquido real:</strong> R$ 392.000 (70% do prêmio)</li>
              </ul>

              <p>
                Na prática, Ramon paga uma alíquota efetiva de 30% por conta da retenção americana, sendo que a diferença entre o que os EUA pegaram (30%) e o que o Brasil cobraria (27,5%) vira prejuízo puro.
              </p>

              <p>
                Pra piorar: ele não pode deduzir nada das despesas. Nos Estados Unidos, um atleta deduz suplementação, nutricionista, preparador físico, passagens, hospedagem em competições. Tudo vira custo operacional. Aqui no Brasil? Tenta abater o whey protein e a creatina na declaração e vai direto pra malha fina. O sistema trata o atleta como se ele ganhasse um prêmio de loteria, não como um profissional que investiu anos de trabalho e dinheiro pra chegar lá.
              </p>

              <p>
                E se o Ramon errar algum código na DARF, esquecer de converter pela cotação certa, ou não declarar no mês correto? Multa de 0,33% ao dia (limitada a 20%) e mais 75% do valor do imposto devido por omissão de rendimentos. Um erro de preenchimento pode custar mais caro que a preparação inteira pro campeonato.
              </p>

              <p>
                Enquanto nos Estados Unidos um atleta pode deduzir despesas com nutricionista, suplementação, viagens pra competições e até marketing pessoal, aqui o brasileiro que tentar abater o whey protein na declaração corre sério risco de cair na malha fina. Lá o sistema entende que essas despesas fazem parte do trabalho. Aqui, o sistema suspeita de tudo.
              </p>

              <p>
                E essa desconfiança não é só paranoia — ela virou ciência de dados.
              </p>

              <h2>A máquina de vigilância fiscal</h2>

              <p>
                Porque justamente pra pegar casos como o do Ramon (atleta que ganha em dólar, recebe de fora, movimenta valores atípicos) a Receita Federal decidiu turbinar a fiscalização com inteligência artificial desde 2024. O sistema, batizado de RFB Analytics, cruza dados bancários, movimentações de PIX, postagens em redes sociais e transações internacionais.
              </p>

              <p>
                E não é conversa. O projeto já identificou mais de 11 bilhões de reais em esquemas de sonegação só no primeiro ano de operação. Encontrou uma fraude de 700 milhões em lavagem de dinheiro com criptomoedas. Detectou uso indevido de prejuízo fiscal que gerou arrecadação adicional de milhões.
              </p>

              <p>
                A plataforma foi desenvolvida por auditores fiscais e analistas tributários usando algoritmos de Python (considerada a linguagem mais avançada em ciência de dados). Ela não processa informações isoladas. Ela mapeia redes complexas de relacionamento entre pessoas, empresas, contas bancárias e até localização geográfica. Consegue identificar "padrões suspeitos" em grupos econômicos inteiros, rastrear empresas de fachada usadas pra emitir notas frias e conectar transações aparentemente desconexas.
              </p>

              <p>
                Traduzindo pro mundo real: um atleta que recebe prêmio internacional, tem patrocínio de empresa gringa, vende consultoria online, recebe publi em dólar e ainda movimenta PIX pra comprar equipamento. Tudo isso vira um grafo de relacionamentos pro algoritmo. E se algum padrão não bater com o que a IA considera "normal", você entra na lista de investigação.
              </p>

              <p>
                O problema? Ninguém sabe o que é "padrão atípico" pra um campeão mundial de bodybuilding. O sistema foi treinado com dados de assalariados CLT, empresas tradicionais e profissionais liberais convencionais. Atletas internacionais, criadores de conteúdo, profissionais digitais (todos esses perfis são anomalias estatísticas). E anomalias chamam atenção do algoritmo.
              </p>

              <p>
                Não existe transparência. Você não recebe uma notificação dizendo "foi marcado porque X, Y e Z". Simplesmente aparece uma fiscalização. E quando ela chega, o ônus da prova é seu (você que precisa provar que não está sonegando, não o contrário).
              </p>

              <p>
                A Receita apresenta o Analytics em fóruns internacionais como exemplo de capacidade brasileira de processar dados e obter resultados concretos. Tem até parceria com administrações tributárias de outros países pra trocar informações. É tecnologia de ponta, sem dúvida. Mas aplicada num sistema tributário que ainda trata sucesso financeiro como suspeita.
              </p>

              <p>
                Ramon Dino representa isso perfeitamente: o cara colocou o país no mapa do esporte mundial, mas agora vai precisar navegar por um labirinto de obrigações fiscais internacionais, declarações de bens no exterior e códigos de DARF que ninguém entende direito. Um erro de preenchimento pode custar mais caro que a preparação pro Mr. Olympia.
              </p>

              <p>
                E o mais irônico de tudo? O mesmo governo que usa o atleta pra fazer marketing esportivo e postar "orgulho nacional" no Twitter é o mesmo que vai tributar o troféu antes da tinta da medalha secar.
              </p>

              <h2>O paradoxo brasileiro</h2>

              <p>
                Vamos deixar claro: não se trata de defender que atletas não devam pagar impostos. Óbvio que devem. A questão é como esse imposto é cobrado.
              </p>

              <p>
                O caso do Ramon não é sobre isenção fiscal. É sobre um sistema que trata um profissional de alto rendimento como se fosse um apostador de loteria. Que bitributa sem compensar direito. Que não permite dedução de custos operacionais óbvios. Que usa inteligência artificial pra fiscalizar, mas mantém uma burocracia analógica na hora de declarar.
              </p>

              <p>
                É sobre um país que celebra a vitória nas redes sociais, mas complica a vida de quem trouxe essa vitória na hora de prestar contas. Que quer ser potência esportiva, mas trata atletas internacionais como anomalias estatísticas suspeitas.
              </p>

              <p>
                O Leão ganhou inteligência artificial, ganhou cruzamento de dados em tempo real, ganhou capacidade de processar bilhões de informações. Mas continua operando com uma lógica tributária que não diferencia um campeão mundial de um sonegador profissional. Ambos são "padrões atípicos" pro algoritmo.
              </p>

              <p>
                Enquanto isso, atletas viram PJ, criadores de conteúdo abrem CNPJ e o brasileiro médio torce pra não ser marcado por algum padrão que o sistema considera suspeito — mesmo quando tudo está correto.
              </p>

              <p>
                Tributar é necessário. Mas tributar com inteligência também deveria ser. Reconhecer custos operacionais legítimos não é privilégio (é bom senso). Permitir deduções que outros países permitem não é favor (é competitividade). E usar tecnologia de ponta pra fiscalizar deveria vir acompanhado de um sistema moderno pra declarar.
              </p>

              <p>
                A vitória de Ramon Dino foi construída com disciplina, sacrifício e anos de investimento. Que ele pague seus impostos, sim. Mas que o sistema pelo menos reconheça a diferença entre sucesso e sonegação antes de tratá-los da mesma forma.
              </p>

              <p>
                O corpo é dele. O imposto é justo. Mas a burocracia? Essa sim precisa de um shape novo.
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
