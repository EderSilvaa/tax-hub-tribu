import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-law-office.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      {/* Minimal background with subtle overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Clean, minimal content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 sm:space-y-12">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-open-ring font-light tracking-tight leading-none">
              <span className="text-accent font-medium">TaxHub</span>
            </h1>
            <div className="w-16 h-px bg-accent mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
              Especializado em identificar tributos pagos a maior e transformar isso em economia pro cliente.
            </p>
          </div>
            
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 px-8 py-3 font-medium">
              Agendar Consulta
            </Button>
            <Button variant="outline" size="lg" className="border border-accent/20 text-accent hover:bg-accent/5 hover:border-accent/40 transition-all duration-200 px-8 py-3 font-medium">
              Nossos Serviços
            </Button>
          </div>
            
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 sm:pt-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-medium text-accent">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-light mt-1">Casos Resolvidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-medium text-accent">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-light mt-1">Dedicação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-medium text-accent">24h</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-light mt-1">Resposta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;