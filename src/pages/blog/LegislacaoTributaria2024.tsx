import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogImage from "@/assets/blog-legislacao-tributaria.jpg";

const LegislacaoTributaria2024 = () => {
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
                <Badge variant="secondary">Legislação</Badge>
                <span className="text-sm text-muted-foreground">5 min de leitura</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Principais Mudanças na Legislação Tributária de 2024
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>15 de março de 2024</span>
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
                alt="Legislação Tributária 2024" 
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
                  Entenda as principais alterações que impactam empresas e pessoas físicas neste ano e como se preparar para as mudanças.
                </p>

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

            <div className="bg-primary/5 rounded-lg p-6 mt-8 max-w-3xl mx-auto">
              <h3 className="font-semibold mb-2">Precisa de Ajuda?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nossa equipe especializada pode ajudar sua empresa a se adequar às novas regras tributárias.
              </p>
              <Link to="/contato">
                <Button>Entre em Contato</Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default LegislacaoTributaria2024;