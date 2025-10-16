import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: "O Shape É Dele, Mas a Receita Quer a Parte: Como o Leão Vai Tributar o Ramon Dino",
      excerpt: "Ramon Dino conquistou o Mr. Olympia, mas enquanto o Brasil comemorava, a Receita Federal já calculava quanto aquele título valia em impostos.",
      date: "2024-10-16",
      author: "Eder Silva",
      category: "Tributação Internacional",
      readTime: "8 min",
      slug: "ramon-dino-tributacao"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-accent/5 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-accent to-accent-subtle bg-clip-text text-transparent">
                Coluna
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Análises autorais sobre tributação, economia e o impacto dos impostos na vida real.
              <span className="text-accent font-medium"> Direto ao ponto, sem juridiquês.</span>
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-base leading-relaxed">
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