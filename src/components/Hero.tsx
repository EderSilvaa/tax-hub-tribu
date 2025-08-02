import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-law-office.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/75" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="text-foreground">SILVA</span>
                <br />
                <span className="text-accent">Tributário</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Especialista em Direito Tributário com mais de 15 anos de experiência 
                em consultoria e contencioso fiscal.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold">
                Agendar Consulta
              </Button>
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg">
                Nossos Serviços
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-muted-foreground">Casos Resolvidos</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent">15</div>
                <div className="text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-muted-foreground">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;