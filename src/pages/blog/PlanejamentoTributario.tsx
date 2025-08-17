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
                  <span>SILVA Tributário</span>
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
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                          [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:text-3xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b-2 [&_h2]:border-primary [&_h2]:pb-2
                          [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3
                          [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
                          [&_ul]:text-muted-foreground [&_ul]:mb-4 [&_ol]:text-muted-foreground [&_ol]:mb-4
                          [&_li]:mb-2 [&_li]:leading-normal
                          [&_strong]:text-foreground [&_strong]:font-semibold">
              <p className="text-xl text-muted-foreground mb-8">
                Estratégias legais para reduzir a carga tributária e otimizar os resultados da sua pequena empresa.
              </p>

              <h2>O que é Planejamento Tributário?</h2>
              <p>
                O planejamento tributário é um conjunto de práticas legais que visa reduzir 
                a carga tributária de uma empresa, otimizando seus resultados financeiros. 
                Para pequenas empresas, essa estratégia pode ser decisiva para a sustentabilidade 
                e crescimento do negócio.
              </p>

              <h2>Benefícios do Planejamento Tributário</h2>
              <ul>
                <li>Redução legal da carga tributária</li>
                <li>Melhoria do fluxo de caixa</li>
                <li>Aumento da competitividade</li>
                <li>Prevenção de riscos fiscais</li>
                <li>Otimização dos resultados financeiros</li>
                <li>Compliance fiscal</li>
              </ul>

              <h2>Regimes Tributários para Pequenas Empresas</h2>
              
              <h3>1. Simples Nacional</h3>
              <p>
                O regime mais vantajoso para a maioria das pequenas empresas:
              </p>
              <ul>
                <li>Unifica até 8 tributos em uma única guia</li>
                <li>Alíquotas progressivas de acordo com o faturamento</li>
                <li>Menos obrigações acessórias</li>
                <li>Limite de faturamento: R$ 4,8 milhões anuais</li>
              </ul>

              <h3>2. Lucro Presumido</h3>
              <p>
                Alternativa para empresas que não se enquadram no Simples:
              </p>
              <ul>
                <li>Base de cálculo presumida</li>
                <li>Pode ser vantajoso para empresas com alta margem</li>
                <li>Menos complexidade que o Lucro Real</li>
              </ul>

              <h3>3. MEI (Microempreendedor Individual)</h3>
              <p>
                Para negócios muito pequenos:
              </p>
              <ul>
                <li>Faturamento limitado a R$ 81.000/ano</li>
                <li>Valor fixo mensal</li>
                <li>Processo simplificado</li>
              </ul>

              <h2>Estratégias de Planejamento</h2>
              
              <h3>1. Escolha do Regime Tributário</h3>
              <p>
                Analise qual regime oferece menor carga tributária para seu perfil de negócio:
              </p>
              <ul>
                <li>Compare as alíquotas efetivas</li>
                <li>Considere as obrigações acessórias</li>
                <li>Avalie o crescimento futuro</li>
              </ul>

              <h3>2. Gestão de Pró-labore e Distribuição de Lucros</h3>
              <p>
                Otimize a remuneração dos sócios:
              </p>
              <ul>
                <li>Defina pró-labore adequado</li>
                <li>Utilize distribuição de lucros (isenta de IR)</li>
                <li>Considere os limites legais</li>
              </ul>

              <h3>3. Controle de Despesas Dedutíveis</h3>
              <p>
                Maximize as deduções permitidas:
              </p>
              <ul>
                <li>Mantenha documentação organizada</li>
                <li>Identifique todas as despesas dedutíveis</li>
                <li>Planeje investimentos e compras</li>
              </ul>

              <h2>Planejamento por Setor</h2>
              
              <h3>Comércio</h3>
              <ul>
                <li>Análise da substituição tributária</li>
                <li>Gestão do estoque para ICMS</li>
                <li>Aproveitamento de créditos</li>
              </ul>

              <h3>Serviços</h3>
              <ul>
                <li>Análise do ISS municipal</li>
                <li>Gestão de retenções na fonte</li>
                <li>Planejamento de PIS/COFINS</li>
              </ul>

              <h3>Indústria</h3>
              <ul>
                <li>Benefícios fiscais regionais</li>
                <li>Créditos de IPI</li>
                <li>Incentivos à inovação</li>
              </ul>

              <h2>Cuidados e Compliance</h2>
              
              <h3>Limites Legais</h3>
              <p>
                Todo planejamento deve respeitar:
              </p>
              <ul>
                <li>Legislação tributária vigente</li>
                <li>Jurisprudência dos tribunais</li>
                <li>Normas dos órgãos fiscalizadores</li>
              </ul>

              <h3>Documentação</h3>
              <ul>
                <li>Mantenha registros atualizados</li>
                <li>Documente as estratégias adotadas</li>
                <li>Preserve comprovantes por 5 anos</li>
              </ul>

              <h2>Quando Revisar o Planejamento</h2>
              <p>
                O planejamento tributário deve ser revisado:
              </p>
              <ul>
                <li>Anualmente, antes do início do exercício</li>
                <li>Quando há mudanças na legislação</li>
                <li>Em caso de crescimento significativo</li>
                <li>Ao mudar o mix de produtos/serviços</li>
                <li>Em operações societárias</li>
              </ul>

              <h2>Conclusão</h2>
              <p>
                O planejamento tributário é essencial para a saúde financeira das pequenas empresas. 
                Com as estratégias certas, é possível reduzir significativamente a carga tributária 
                de forma legal e segura. Invista em assessoria especializada para maximizar os 
                benefícios e evitar riscos.
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
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PlanejamentoTributario;