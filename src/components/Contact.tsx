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
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para atender você e encontrar a melhor solução para suas questões tributárias.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <div>
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Solicite uma Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nome Completo
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Seu nome"
                        className="bg-background border-border focus:border-accent focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        E-mail
                      </label>
                      <Input 
                        type="email" 
                        placeholder="seu@email.com"
                        className="bg-background border-border focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Telefone
                      </label>
                      <Input 
                        type="tel" 
                        placeholder="(11) 99999-9999"
                        className="bg-background border-border focus:border-accent focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Assunto
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Assunto da consulta"
                        className="bg-background border-border focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <Textarea 
                      placeholder="Descreva brevemente sua situação..."
                      rows={5}
                      className="bg-background border-border focus:border-accent focus:ring-accent resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-lg font-semibold"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-12 lg:mt-0 space-y-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="bg-card border-border hover:bg-card-hover transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground">
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

            {/* CTA Card */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Consulta de Urgência?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Para casos urgentes, entre em contato diretamente pelo WhatsApp
                </p>
                <Button 
                  size="lg" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
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