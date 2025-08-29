import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="glass border-t border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Modern Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-2xl sm:text-3xl font-sans font-bold">
                <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  TaxHub
                </span>
              </div>
              <Badge variant="gradient" size="sm">
                Hub de Tecnologia Tributária
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Startup de tecnologia tributária que oferece softwares inovadores e 
              acompanhamento jurídico-contábil especializado para empresas modernas.
            </p>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              Links Rápidos
              <ArrowUpRight className="w-4 h-4 ml-2 text-accent" />
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Início", href: "#home" },
                { name: "Sobre", href: "#about" },
                { name: "Softwares", href: "#services" },
                { name: "Contato", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Modern Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Entre em Contato
            </h3>
            <div className="space-y-4">
              <div className="glass rounded-lg p-4 hover:bg-accent/5 transition-colors duration-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-muted-foreground text-sm">
                    <div className="font-medium">Escritório Virtual</div>
                    <div>Atendimento 100% Digital</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-300">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-muted-foreground text-sm font-medium">
                  (91) 99999-9999
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-300">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-muted-foreground text-sm font-medium">
                  contato@taxhub.com.br
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-muted-foreground text-sm flex items-center">
              © 2024 TaxHub. Todos os direitos reservados.
              <Badge variant="glass" size="sm" className="ml-3">
                Startup
              </Badge>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-colors duration-300 hover-lift">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-300 hover-lift">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;