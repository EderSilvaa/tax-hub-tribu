import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Início", href: "#home" },
    { name: "Contato", href: "#contact" },
  ];

  const services = [
    { name: "Recuperação de Tributos", href: "/servicos/recuperacao-tributos" },
    { name: "Isenções para Pequenas Empresas", href: "/servicos/isencoes-pequenas-empresas" },
    { name: "Consultoria Preventiva", href: "/servicos/consultoria-preventiva" },
    { name: "Defesa em Autuações", href: "/servicos/defesa-autuacoes" },
    { name: "Imposto de Renda", href: "/servicos/imposto-renda" },
    { name: "Consultoria Especializada", href: "/servicos/consultoria-especializada" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ed3f1b85-3725-4891-962f-4c321c7121a3.png" 
                alt="SILVA Tributário Logo" 
                className="h-8 w-auto"
              />
            </div>
          </div>

          {/* Minimal Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
              >
                {item.name}
              </a>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light">
                Serviços
                <ChevronDown size={14} className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border-border">
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild>
                    <a 
                      href={service.href}
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      {service.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Minimal Desktop CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 px-4 py-2 text-sm font-medium">
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Clean Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-2 pb-4 space-y-2 bg-background border-t border-border/30">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="px-2 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Serviços:</div>
                {services.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    className="block px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.name}
                  </a>
                ))}
              </div>
              
              <div className="px-2 pt-2">
                <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-2 text-sm font-medium">
                  Agendar Consulta
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;