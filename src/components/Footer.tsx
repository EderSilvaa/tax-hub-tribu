import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Clean Brand */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-xl sm:text-2xl font-light tracking-wide">
              <span className="text-accent font-medium">TaxHub</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Especialista em Direito Tributário com mais de 15 anos de experiência, 
              oferecendo soluções eficientes e personalizadas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-medium text-foreground">
              Links Rápidos
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {[
                { name: "Início", href: "#home" },
                { name: "Sobre", href: "#about" },
                { name: "Serviços", href: "#services" },
                { name: "Contato", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors duration-200 font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base font-medium text-foreground">
              Contato
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground text-xs sm:text-sm font-light">
                  <div>Av. Paulista, 1000 - 15º Andar</div>
                  <div>Bela Vista, São Paulo - SP</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="text-muted-foreground text-xs sm:text-sm font-light">
                  (11) 3456-7890
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="text-muted-foreground text-xs sm:text-sm font-light">
                  contato@taxhub.com.br
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-muted-foreground text-xs font-light">
              © 2024 TaxHub. Todos os direitos reservados.
            </div>
            <div className="flex space-x-4 sm:space-x-6 text-xs text-muted-foreground font-light">
              <a href="#" className="hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                OAB/SP
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;