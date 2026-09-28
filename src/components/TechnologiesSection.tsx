import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Shield, Zap, FileText } from "lucide-react";

const TechnologiesSection = () => {
  const technologies = [
    {
      title: "Certificaciones Internacionales",
      description: "Mantenemos un sistema integrado para la calidad que cumple con:",
      features: ["ISO 9001:2015 (Sistema de gestión de calidad)", "ISO 17020:2012 (Requisitos para organismos de inspección)"],
      icon: Award,
    },
    {
      title: "Cumplimiento Normativo",
      description: "Trabajamos cumpliendo con los requisitos de:",
      features: ["ISO", "API", "ASTM", "ASME", "STANDARD DS-1 TH-Hill", "AWS", "IADCC", "SAE", "entre otros"],
      icon: Shield,
    },
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
            Cumplimiento Normativo
          </h3>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="professional">
              <a
                href="/ARCH-DTRNC-2026-SURAMEREND.SA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver Autorización ARCH (PDF)"
              >
                <FileText className="w-4 h-4 mr-2" />
                Autorización ARCH
              </a>
            </Button>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="professional">
              <a
                href="/EMA-SUR-25UI3509.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver Certificado de Acreditación EMA (PDF)"
              >
                <FileText className="w-4 h-4 mr-2" />
                Certificado de acreditación EMA
              </a>
            </Button>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="professional">
              <a
                href="/SAE-ACR-0325-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver Certificado de Acreditación SAE (PDF)"
              >
                <FileText className="w-4 h-4 mr-2" />
                Certificado de Acreditación SAE
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;