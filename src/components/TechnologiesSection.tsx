import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Shield, Zap } from "lucide-react";

const TechnologiesSection = () => {
  const technologies = [
    {
      title: "Equipos de Última Generación",
      description: "Utilizamos instrumentos de medición y análisis de las marcas más reconocidas mundialmente.",
      features: ["Equipos Olympus", "Tecnología Phased Array", "TOFD (Time of Flight Diffraction)", "Análisis Digital Avanzado"],
      icon: Zap,
    },
    {
      title: "Certificaciones Internacionales",
      description: "Nuestro personal cuenta con las máximas certificaciones de la industria END.",
      features: ["ASNT Level II & III", "ISO 9712", "ACCP Certified", "Certificaciones Específicas por Cliente"],
      icon: Award,
    },
    {
      title: "Cumplimiento Normativo",
      description: "Adherimos estrictamente a los códigos y estándares más exigentes de la industria.",
      features: ["ASME Sec. V", "API 1104", "AWS D1.1", "ISO 17025"],
      icon: Shield,
    },
  ];

  const certifications = [
    "ASNT - American Society for Nondestructive Testing",
    "ISO 9712 - Qualification and certification of NDT personnel",
    "ACCP - American Council for Construction Personnel",
    "API - American Petroleum Institute",
    "ASME - American Society of Mechanical Engineers",
    "AWS - American Welding Society",
  ];

  return (
    <section id="tecnologias" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tecnología y Certificaciones
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Combinamos equipos de última generación con personal altamente certificado 
            para ofrecer resultados confiables que cumplen los más altos estándares internacionales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-normal bg-card border-border">
              <CardHeader>
                <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <tech.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">{tech.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {tech.description}
                </p>
                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-muted/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Certificaciones y Acreditaciones
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="p-3 text-center justify-center text-sm bg-secondary/50 hover:bg-secondary transition-colors duration-normal"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;