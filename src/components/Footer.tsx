import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-3xl font-bold">
              <span className="text-primary-foreground">SILVA</span>
              <span className="text-accent"> Tributário</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Especialista em Direito Tributário com mais de 15 anos de experiência, 
              oferecendo soluções eficientes e personalizadas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Início", href: "#home" },
                { name: "Sobre", href: "#about" },
                { name: "Serviços", href: "#services" },
                { name: "Contato", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground">
              Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  <div>Av. Paulista, 1000 - 15º Andar</div>
                  <div>Bela Vista, São Paulo - SP</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/80 text-sm">
                  (11) 3456-7890
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/80 text-sm">
                  contato@silvatributario.com.br
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2024 Silva Tributário. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-primary-foreground/60">
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