import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-recuperacao-tributos.jpg";

const RecuperacaoTributos = () => {
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
                <Badge variant="secondary">Recuperação</Badge>
                <span className="text-sm text-muted-foreground">8 min de leitura</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Como Recuperar Tributos Pagos Indevidamente
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>10 de março de 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>SILVA Tributário</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={blogImage} 
                alt="Recuperação de Tributos" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                          [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:text-3xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b-2 [&_h2]:border-primary [&_h2]:pb-2
                          [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3
                          [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
                          [&_ul]:text-muted-foreground [&_ul]:mb-4 [&_ol]:text-muted-foreground [&_ol]:mb-4
                          [&_li]:mb-2 [&_li]:leading-normal
                          [&_strong]:text-foreground [&_strong]:font-semibold">
              <p className="text-xl text-muted-foreground mb-8">
                Guia completo sobre o processo de recuperação de tributos e os documentos necessários para reaver valores pagos indevidamente.
              </p>

              <h2>O que são Tributos Pagos Indevidamente?</h2>
              <p>
                Tributos pagos indevidamente são valores recolhidos ao Fisco de forma incorreta, 
                seja por erro de cálculo, interpretação equivocada da legislação ou pagamento 
                de tributo não devido. Todo contribuinte tem o direito de recuperar esses valores.
              </p>

              <h2>Principais Situações de Pagamento Indevido</h2>
              <ul>
                <li>Erro no cálculo de impostos</li>
                <li>Aplicação incorreta de alíquotas</li>
                <li>Pagamento em duplicidade</li>
                <li>Recolhimento de tributo não devido</li>
                <li>Excesso de recolhimento em guias</li>
                <li>Pagamento após prazo de vencimento com juros incorretos</li>
              </ul>

              <h2>Documentos Necessários</h2>
              <p>Para solicitar a recuperação de tributos, você precisará reunir:</p>
              
              <h3>Documentos Básicos</h3>
              <ul>
                <li>Comprovantes de pagamento dos tributos</li>
                <li>Declarações fiscais do período</li>
                <li>Documentos que comprovem o erro</li>
                <li>Cálculo demonstrativo do valor a recuperar</li>
              </ul>

              <h3>Documentos Específicos por Tributo</h3>
              <ul>
                <li><strong>IRPJ/CSLL:</strong> Demonstrações contábeis, LALUR</li>
                <li><strong>PIS/COFINS:</strong> Registros de vendas e compras</li>
                <li><strong>ICMS:</strong> Livros fiscais, notas fiscais</li>
                <li><strong>IPI:</strong> Controle de produção, classificação fiscal</li>
              </ul>

              <h2>Modalidades de Recuperação</h2>
              
              <h3>1. Compensação</h3>
              <p>
                A compensação permite utilizar créditos de tributos pagos indevidamente 
                para quitar débitos de outros tributos federais.
              </p>

              <h3>2. Restituição</h3>
              <p>
                Quando não há débitos para compensar, o contribuinte pode solicitar 
                a restituição em dinheiro dos valores pagos indevidamente.
              </p>

              <h3>3. Ressarcimento</h3>
              <p>
                Aplicável principalmente para PIS/COFINS, quando há repasse do ônus 
                financeiro ao consumidor final.
              </p>

              <h2>Prazos Prescricionais</h2>
              <p>
                É importante observar os prazos para não perder o direito à recuperação:
              </p>
              <ul>
                <li><strong>Tributos Federais:</strong> 5 anos</li>
                <li><strong>Tributos Estaduais:</strong> 5 anos (pode variar por estado)</li>
                <li><strong>Tributos Municipais:</strong> 5 anos (pode variar por município)</li>
              </ul>

              <h2>Processo de Recuperação</h2>
              
              <h3>Passo 1: Análise e Levantamento</h3>
              <p>
                Identifique os tributos pagos indevidamente através de análise 
                detalhada dos recolhimentos e da legislação aplicável.
              </p>

              <h3>Passo 2: Cálculo dos Valores</h3>
              <p>
                Calcule o valor principal, juros e correção monetária dos 
                tributos a serem recuperados.
              </p>

              <h3>Passo 3: Formalização do Pedido</h3>
              <p>
                Elabore e protocole o pedido administrativo junto ao órgão 
                competente com toda a documentação necessária.
              </p>

              <h3>Passo 4: Acompanhamento</h3>
              <p>
                Acompanhe o andamento do processo e responda eventuais 
                exigências do Fisco.
              </p>

              <h2>Conclusão</h2>
              <p>
                A recuperação de tributos pagos indevidamente é um direito do contribuinte 
                e pode representar importantes recursos para o caixa da empresa. É fundamental 
                contar com assessoria especializada para identificar oportunidades e conduzir 
                o processo de forma eficiente.
              </p>

              <div className="bg-primary/5 rounded-lg p-6 mt-8">
                <h3 className="font-semibold mb-2">Quer Recuperar Seus Tributos?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe pode fazer uma análise gratuita dos seus recolhimentos e identificar oportunidades de recuperação.
                </p>
                <Link to="/contato">
                  <Button>Solicite uma Análise</Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default RecuperacaoTributos;