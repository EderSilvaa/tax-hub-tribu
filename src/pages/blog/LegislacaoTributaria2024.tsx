import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
                  <span>SILVA Tributário</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Entenda as principais alterações que impactam empresas e pessoas físicas neste ano e como se preparar para as mudanças.
              </p>

              <h2>Resumo das Principais Mudanças</h2>
              <p>
                O ano de 2024 trouxe importantes modificações na legislação tributária brasileira, 
                afetando tanto pessoas físicas quanto jurídicas. Essas mudanças visam modernizar 
                o sistema tributário e aumentar a arrecadação.
              </p>

              <h2>1. Alterações no Imposto de Renda</h2>
              <p>
                As principais mudanças no Imposto de Renda incluem:
              </p>
              <ul>
                <li>Novo valor da faixa de isenção</li>
                <li>Alterações nas deduções permitidas</li>
                <li>Mudanças nos prazos de entrega da declaração</li>
                <li>Novas obrigações para investimentos no exterior</li>
              </ul>

              <h2>2. Modificações Tributárias para Empresas</h2>
              <p>
                As empresas devem estar atentas às seguintes mudanças:
              </p>
              <ul>
                <li>Novas regras para o Simples Nacional</li>
                <li>Alterações no ICMS para e-commerce</li>
                <li>Mudanças nas regras de tributação de lucros no exterior</li>
                <li>Novas obrigações acessórias</li>
              </ul>

              <h2>3. Impactos do PIX na Tributação</h2>
              <p>
                O crescimento do PIX trouxe novas regras de controle e fiscalização:
              </p>
              <ul>
                <li>Monitoramento de transações acima de determinados valores</li>
                <li>Novas obrigações de prestação de informações</li>
                <li>Impactos na tributação de pessoas físicas</li>
              </ul>

              <h2>4. Como Se Preparar</h2>
              <p>
                Para estar em conformidade com as novas regras:
              </p>
              <ol>
                <li>Revise seus processos internos</li>
                <li>Atualize seus sistemas de controle</li>
                <li>Busque orientação profissional especializada</li>
                <li>Mantenha-se atualizado com as mudanças</li>
              </ol>

              <h2>Conclusão</h2>
              <p>
                As mudanças na legislação tributária de 2024 exigem atenção especial de 
                contribuintes e empresas. É fundamental buscar orientação profissional 
                para garantir o cumprimento das novas obrigações e evitar problemas 
                com a Receita Federal.
              </p>

              <div className="bg-primary/5 rounded-lg p-6 mt-8">
                <h3 className="font-semibold mb-2">Precisa de Ajuda?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe especializada pode ajudar sua empresa a se adequar às novas regras tributárias.
                </p>
                <Link to="/contato">
                  <Button>Entre em Contato</Button>
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

export default LegislacaoTributaria2024;