import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Magnet, Activity, Droplets, Ruler, TrendingDown, } from "lucide-react";
import ultrasonicImage from "@/assets/ultrasonic-equipment.jpg";
import magneticImage from "@/assets/magnetic-particle.jpg";
import radiographyImage from "@/assets/radiography.jpg";
import angularUltrasoundImage from "@/assets/angularUltrasound.webp";
import penetratingLiquidsImage from "@/assets/penetratingLiquids.webp";
import emiMFLImage from "@/assets/EMI-MFL.webp";
import visualInspectionImage from "@/assets/visualInspection.webp";

const ServicesSection = () => {
  const services = [
    {
      title: "Inspección por pulso-eco",
      description: "(UT, por sus siglas en inglés) es una técnica de inspección que emite ondas de sonido de alta frecuencia hacia un material y analiza los ecos reflejados.",
      benefits: "Es clave para identificar defectos internos y medir espesores sin causar ningún daño.",
      icon: Zap,
      image: ultrasonicImage,
    },
    {
      title: "Ultrasonido utilizando la técnica de haz angular",
      description: "Consiste en transmitir ondas sonoras que entran al material con un ángulo distinto a 90°.",
      benefits: "Esta técnica es fundamental cuando el acceso directo está bloqueado (Interior del material tubular), permitiendo localizar discontinuidades y evaluar la pérdida de material de manera no destructiva.",
      icon: TrendingDown,
      image: angularUltrasoundImage,
    },
    {
      title: "Líquidos (Tintes) penetrantes",
      description: "Es un ensayo no destructivo (END) utilizado para detectar grietas, poros y fisuras superficiales en materiales sólidos no porosos. Funciona por capilaridad, penetrando en las discontinuidades del material para luego resaltarlas visualmente mediante un líquido revelador.",
      benefits: "Se aplican a todos los metales.",
      icon: Droplets,
      image: penetratingLiquidsImage,
    },
    {
      title: "Inspección Electromagnética por Fuga de Campo (EMI-MFL)",
      description: "Se utilizan en la industria petrolera en tuberías de perforación, producción y revestimiento para obtener una exploración de las paredes del tubo, determinando perforaciones, corrosión y pérdidas de espesor de la pared.",
      benefits: "Una de las técnicas de ensayo no destructivo más eficaces para materiales ferromagnéticos.",
      icon: Activity,
      image: emiMFLImage,
    },
    {
      title: "Inspección aplicando partículas magnéticas",
      description: "Es un ensayo no destructivo (END) utilizado para detectar discontinuidades superficiales en materiales ferromagnéticos mediante la aplicación de un campo magnético y partículas magnéticas.",
      benefits: "Alta sensibilidad para defectos superficiales, aplicable en campo, resultados inmediatos.",
      icon: Magnet,
      image: magneticImage,
    },
    {
      title: "Inspección visual y análisis dimensional",
      description: "Es un ensayo no destructivo (END) utilizado para evaluar visualmente y medir dimensiones de componentes, asegurando que cumplan con las especificaciones requeridas.",
      benefits: "Permite detectar defectos superficiales y verificar dimensiones críticas sin dañar el componente, conforme a las normas aplicables como: API, ASTM, DS-1, ASME, SAE.",
      icon: Ruler,
      image: visualInspectionImage,
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