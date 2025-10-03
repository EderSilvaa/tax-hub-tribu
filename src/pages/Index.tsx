import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/features/taxAI/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
