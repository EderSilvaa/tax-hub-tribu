import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Av. Paulista, 1000 - 15º Andar", "Bela Vista, São Paulo - SP", "CEP: 01310-100"]
    },
    {
      icon: Phone,
      title: "Telefone",
      details: ["(11) 3456-7890", "(11) 98765-4321"]
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@silvatributario.com.br", "dr.silva@silvatributario.com.br"]
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      details: ["Segunda a Sexta: 8h às 18h", "Sábado: 8h às 12h", "Emergências: 24h"]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
            Entre em Contato
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Estamos prontos para atender você e encontrar a melhor solução para suas questões tributárias.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form - Takes more space */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="bg-card border-border/30 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl font-medium text-foreground">
                  Solicite uma Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-foreground">
                        Nome Completo
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Seu nome"
                        className="bg-background border-border/30 focus:border-accent/50 focus:ring-accent/20 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-foreground">
                        E-mail
                      </label>
                      <Input 
                        type="email" 
                        placeholder="seu@email.com"
                        className="bg-background border-border/30 focus:border-accent/50 focus:ring-accent/20 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-foreground">
                        Telefone
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="(11) 99999-9999"
                        className="bg-background border-border/30 focus:border-accent/50 focus:ring-accent/20 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-foreground">
                        Assunto
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Assunto da consulta"
                        className="bg-background border-border/30 focus:border-accent/50 focus:ring-accent/20 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-foreground">
                      Mensagem
                    </label>
                    <Textarea 
                      placeholder="Descreva brevemente sua situação..."
                      rows={4}
                      className="bg-background border-border/30 focus:border-accent/50 focus:ring-accent/20 resize-none text-sm"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-sm font-medium transition-colors"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="bg-card border-border/30 hover:border-accent/20 transition-colors duration-300">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-accent" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-medium text-foreground mb-1">
                            {info.title}
                          </h3>
                          <div className="space-y-0.5">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-xs sm:text-sm text-muted-foreground font-light">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Emergency CTA */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
                  Consulta de Urgência?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 font-light">
                  Para casos urgentes, entre em contato diretamente pelo WhatsApp
                </p>
                <Button 
                  size="sm" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 text-sm font-medium"
                >
                  Chamar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;