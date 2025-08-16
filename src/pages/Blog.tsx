import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  // Placeholder blog posts - these would come from a CMS or database in a real app
  const blogPosts = [
    {
      id: 1,
      title: "Principais Mudanças na Legislação Tributária de 2024",
      excerpt: "Entenda as principais alterações que impactam empresas e pessoas físicas neste ano.",
      date: "2024-03-15",
      author: "SILVA Tributário",
      category: "Legislação",
      readTime: "5 min",
      slug: "legislacao-tributaria-2024"
    },
    {
      id: 2,
      title: "Como Recuperar Tributos Pagos Indevidamente",
      excerpt: "Guia completo sobre o processo de recuperação de tributos e os documentos necessários.",
      date: "2024-03-10",
      author: "SILVA Tributário",
      category: "Recuperação",
      readTime: "8 min",
      slug: "recuperacao-tributos"
    },
    {
      id: 3,
      title: "Planejamento Tributário para Pequenas Empresas",
      excerpt: "Estratégias legais para reduzir a carga tributária e otimizar os resultados da sua empresa.",
      date: "2024-03-05",
      author: "SILVA Tributário",
      category: "Planejamento",
      readTime: "6 min",
      slug: "planejamento-tributario"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Blog Tributário
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mantenha-se atualizado com as últimas novidades, mudanças na legislação 
              e dicas práticas sobre tributos e planejamento fiscal.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>

            {/* Coming Soon Message */}
            <div className="text-center mt-16">
              <div className="bg-primary/5 rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Mais Conteúdo em Breve
                </h3>
                <p className="text-muted-foreground">
                  Estamos preparando mais artigos valiosos sobre tributação, 
                  planejamento fiscal e mudanças na legislação. Volte em breve 
                  para conferir nossos novos posts!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;