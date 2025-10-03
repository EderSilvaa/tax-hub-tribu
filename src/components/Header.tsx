import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Simulador", href: "/simulador" },
    { name: "TaxIA", href: "/taxia" },
    { name: "Sobre Nós", href: "/sobre-nos" },
    { name: "Blog", href: "/blog" },
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
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30 animate-slide-down">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center hover-lift transition-transform duration-300">
              <img
                src="/logo taxhub.png"
                alt="TaxHub Tribu Logo"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Minimal Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  {item.name}
                </a>
              )
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light">
                Serviços
                <ChevronDown size={14} className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border-border">
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild>
                    <Link
                      to={service.href}
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="gradient" size="sm" className="px-4 py-2 text-sm font-medium">
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 hover-lift focus-ring"
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
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}

              <div className="px-2 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Serviços:</div>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    className="block px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <div className="px-2 pt-2">
                <Button variant="gradient" size="sm" className="w-full py-2 text-sm font-medium">
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