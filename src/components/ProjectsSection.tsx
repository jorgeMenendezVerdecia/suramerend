import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Building, Factory, Fuel } from "lucide-react";

const ProjectsSection = () => {
  const testimonials = [
    {
      company: "Petrolera Nacional S.A.",
      project: "Inspección Integral de Oleoducto Principal",
      quote: "El equipo de SURAMER END S.A. demostró un profesionalismo excepcional en la inspección de nuestro oleoducto de 500 km. Su precisión y eficiencia nos permitió identificar y corregir problemas críticos antes de que se convirtieran en fallas costosas.",
      service: "Ultrasonido + Radiografía",
      industry: "Transporte de Petróleo",
      icon: Fuel,
    },
    {
      company: "Refinería del Golfo",
      project: "Mantenimiento Predictivo de Torres de Destilación",
      quote: "Gracias a sus servicios de END, pudimos programar nuestras paradas de mantenimiento de manera más eficiente, reduciendo el tiempo de inactividad en un 30% y ahorrando millones en costos operativos.",
      service: "Termografía + Ultrasonido",
      industry: "Refinación",
      icon: Factory,
    },
    {
      company: "Operadora Costa Afuera",
      project: "Certificación de Soldaduras en Plataforma Marina",
      quote: "Su experiencia en inspecciones marinas y cumplimiento de normativas internacionales fue fundamental para la certificación exitosa de nuestra nueva plataforma. Trabajo impecable bajo condiciones extremas.",
      service: "Radiografía + Partículas Magnéticas",
      industry: "Offshore",
      icon: Building,
    },
  ];

  const projectStats = [
    { number: "500+", label: "Proyectos Completados" },
    { number: "99.8%", label: "Precisión en Detección" },
    { number: "24/7", label: "Disponibilidad de Servicio" },
    { number: "0", label: "Incidentes de Seguridad" },
  ];

  return (
    <section id="proyectos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Casos de Éxito
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Más de 15 años respaldando la integridad de activos críticos en la industria petrolera. 
            Conozca cómo hemos ayudado a nuestros clientes a mantener operaciones seguras y eficientes.
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {projectStats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative bg-card border-border hover:shadow-lg transition-all duration-normal">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <testimonial.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground">{testimonial.company}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.project}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-accent absolute top-4 right-4 opacity-20" />
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.service}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.industry}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-lg p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Proteger sus Activos?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Únase a las empresas líderes que confían en nuestra experiencia para mantener 
              la integridad de sus operaciones petroleras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors duration-normal"
              >
                Solicitar Cotización
              </a>
              <a
                href="#servicios"
                className="border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors duration-normal"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;