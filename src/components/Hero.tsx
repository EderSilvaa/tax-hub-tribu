import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-law-office.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-subtle relative overflow-hidden">
      {/* Modern background with glass effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
      
      {/* Floating elements for modern design */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-subtle/10 rounded-full blur-3xl animate-pulse-glow" />
      
      {/* Modern, clean content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 sm:space-y-12 animate-fade-in">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight leading-none">
                <span className="bg-gradient-to-r from-foreground via-accent to-accent-subtle bg-clip-text text-transparent">
                  TaxHub
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-subtle mx-auto rounded-full" />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-normal">
              Hub de tecnologias tributárias com 
              <span className="text-accent font-medium"> softwares inovadores</span> e acompanhamento jurídico-contábil completo.
            </p>
          </div>
            
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md mx-auto animate-slide-up">
            <Button variant="gradient" size="xl" className="px-8 py-4 font-semibold shadow-glow">
              Testar Softwares
            </Button>
            <Button variant="glass" size="xl" className="px-8 py-4 font-semibold">
              Nossas Soluções
            </Button>
          </div>
            
          <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-16 sm:pt-20 max-w-2xl mx-auto animate-scale-in">
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-accent-subtle bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium mt-2">Clientes Ativos</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-accent-subtle bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium mt-2">Automação</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-accent-subtle bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24h
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium mt-2">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;