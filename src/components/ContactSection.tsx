import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Solicitud Enviada",
      description: "Gracias por contactarnos. Nos comunicaremos con usted en menos de 24 horas.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Oficina Principal",
      details: ["Av. Libertador 1234, Piso 8", "Caracas 1050, Venezuela"],
    },
    {
      icon: Phone,
      title: "Teléfonos",
      details: ["+58 212 555-0123", "+58 414 555-0456"],
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      details: ["info@petrondt.com", "cotizaciones@petrondt.com"],
    },
    {
      icon: Clock,
      title: "Horario de Atención",
      details: ["Lunes - Viernes: 7:00 AM - 6:00 PM", "Emergencias 24/7"],
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ¿Listo para proteger la integridad de sus activos? Solicite una cotización gratuita 
            o consulte con nuestros expertos sobre sus necesidades de END.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                <Send className="w-6 h-6 text-primary" />
                Solicitar Cotización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border"
                      placeholder="Su nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Correo Electrónico *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border"
                      placeholder="su.email@empresa.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Empresa *
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border"
                      placeholder="Nombre de su empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-background border-border"
                      placeholder="+58 414 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-background border-border"
                    placeholder="Describa sus necesidades de inspección, tipo de activos, ubicación, urgencia, etc."
                  />
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Solicitud
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obligatorios. Nos comprometemos a responder en menos de 24 horas.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-card-foreground mb-1">
                            {info.title}
                          </h4>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold text-card-foreground mb-4">
                  Síguenos en Redes Sociales
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/company/petrondt-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-normal"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-accent text-lg mb-2">
                  Servicio de Emergencia 24/7
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Para situaciones críticas que requieren inspección inmediata.
                </p>
                <p className="font-semibold text-foreground text-lg">
                  +58 424 URGENTE (424-874-3683)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;