import { Button } from "@/components/ui/button";
import { Shield, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-ndt-testing.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-hero">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Técnico NDT realizando inspección ultrasónica en refinería petrolera"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Ensayos No Destructivos de
            <span className="text-accent block">Clase Mundial</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Protegemos la integridad de sus activos petroleros con tecnología de punta y 
            certificaciones internacionales. Confianza, precisión y seguridad garantizadas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="cta" size="lg" className="text-lg px-8 py-6" asChild>
              <a href="#contacto">Solicitar Cotización Gratuita</a>
            </Button>
            <Button variant="professional" size="lg" className="text-lg px-8 py-6" asChild>
              <a href="#servicios">Ver Nuestros Servicios</a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-primary-foreground">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Cumplimiento Normativo</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground">
              <Award className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">ASNT</div>
                <div className="text-sm opacity-90">Certificaciones Internacionales</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-90">Años de Experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;