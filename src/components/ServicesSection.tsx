import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Droplets, Magnet, Activity, Thermometer } from "lucide-react";
import ultrasonicImage from "@/assets/ultrasonic-equipment.jpg";
import magneticImage from "@/assets/magnetic-particle.jpg";
import radiographyImage from "@/assets/radiography.jpg";

const ServicesSection = () => {
  const services = [
    {
      title: "Inspección por Ultrasonido",
      description: "Detección precisa de defectos internos en soldaduras, espesores de pared y corrosión. Ideal para tuberías, tanques y estructuras críticas.",
      benefits: "Detección temprana de fallas, medición precisa de espesores, inspección sin interrupciones operativas.",
      icon: Zap,
      image: ultrasonicImage,
    },
    {
      title: "Líquidos Penetrantes",
      description: "Inspección de discontinuidades superficiales en materiales no porosos. Excelente para detectar grietas, porosidad y defectos de soldadura.",
      benefits: "Detección de defectos superficiales invisibles, aplicable en campo, resultados inmediatos.",
      icon: Droplets,
      image: null,
    },
    {
      title: "Partículas Magnéticas",
      description: "Localización de discontinuidades superficiales y subsuperficiales en materiales ferromagnéticos mediante campos magnéticos.",
      benefits: "Alta sensibilidad para defectos críticos, inspección rápida de grandes áreas, certificación de soldaduras.",
      icon: Magnet,
      image: magneticImage,
    },
    {
      title: "Radiografía Industrial",
      description: "Inspección volumétrica completa mediante rayos X y gamma. Proporciona registro permanente de la condición interna de componentes.",
      benefits: "Documentación permanente, detección de defectos internos, cumplimiento de códigos internacionales.",
      icon: Activity,
      image: radiographyImage,
    },
    {
      title: "Termografía",
      description: "Detección de problemas eléctricos, mecánicos y estructurales mediante imágenes térmicas de alta resolución.",
      benefits: "Inspección predictiva, detección temprana de fallas, inspección a distancia segura.",
      icon: Thermometer,
      image: null,
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios de END
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos la gama completa de ensayos no destructivos con tecnología de punta 
            y personal certificado internacionalmente para garantizar la integridad de sus activos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-normal hover:-translate-y-1 bg-card border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{service.title}</CardTitle>
                </div>
                {service.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={service.image}
                      alt={`Equipo de ${service.title}`}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-normal"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-primary text-sm mb-2">Beneficios Clave:</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.benefits}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;