import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-law-office.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Premium Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/90 to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      {/* Premium Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="text-foreground drop-shadow-lg">SILVA</span>
                <br />
                <span className="text-accent drop-shadow-lg bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Tributário</span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent/60 mx-auto lg:mx-0"></div>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Especialista em Direito Tributário com mais de 15 anos de experiência 
                em consultoria estratégica e contencioso fiscal de alta complexidade.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                Agendar Consulta
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-lg backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300">
                Nossos Serviços
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 pt-8 lg:pt-12">
              <div className="text-center lg:text-left group">
                <div className="text-3xl lg:text-4xl font-bold text-accent group-hover:scale-105 transition-transform duration-300">500+</div>
                <div className="text-muted-foreground text-sm lg:text-base font-medium">Casos Resolvidos</div>
              </div>
              <div className="text-center lg:text-left group">
                <div className="text-3xl lg:text-4xl font-bold text-accent group-hover:scale-105 transition-transform duration-300">15</div>
                <div className="text-muted-foreground text-sm lg:text-base font-medium">Anos de Experiência</div>
              </div>
              <div className="text-center lg:text-left group">
                <div className="text-3xl lg:text-4xl font-bold text-accent group-hover:scale-105 transition-transform duration-300">98%</div>
                <div className="text-muted-foreground text-sm lg:text-base font-medium">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;