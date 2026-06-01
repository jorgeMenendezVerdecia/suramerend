import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Shield, Zap } from "lucide-react";

const TechnologiesSection = () => {
  const technologies = [
    {
      title: "Certificaciones Internacionales",
      description: "Mantenemos un sistema integrado para la calidad que cumple con:",
      features: ["ISO 9001:2015 (sistema de gestión de calidad)", "ISO 17020:2012 (requisitos para organismos de inspección)"],
      icon: Award,
    },
    {
      title: "Cumplimiento Normativo",
      description: "Trabajamos cumpliendo con los requisitos de:",
      features: ["ISO", "API", "ASTM", "ASME", "STANDARD DS-1 TH-Hill", "AWS", "IADCC", "SAE", "entre otros"],
      icon: Shield,
    },
  ];

  const certifications = [
    "API - American Petroleum Institute",
    "AWS - American Welding Society",
    "ASNT - American Society for Nondestructive Testing",
    "ASME - American Society of Mechanical Engineers",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 justify-items-center">
          {technologies.map((tech, index) => (
            <Card key={index} className="w-full max-w-xl text-center hover:shadow-lg transition-all duration-normal bg-card border-border">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center">
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