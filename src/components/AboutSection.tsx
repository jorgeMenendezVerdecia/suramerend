import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Shield, Users } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      title: "Excelencia Técnica",
      description: "Comprometidos con los más altos estándares de calidad en cada inspección, utilizando tecnología de punta y mejores prácticas.",
      icon: Target,
    },
    {
      title: "Integridad",
      description: "Operamos con transparencia, honestidad y ética profesional en todas nuestras relaciones comerciales y técnicas.",
      icon: Heart,
    },
    {
      title: "Seguridad Primero",
      description: "La seguridad de nuestro personal, clientes y el medio ambiente es nuestra prioridad absoluta en cada proyecto.",
      icon: Shield,
    },
    {
      title: "Servicio al Cliente",
      description: "Construimos relaciones duraderas proporcionando soluciones personalizadas y soporte técnico excepcional.",
      icon: Users,
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acerca de Petro-NDT Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos líderes en ensayos no destructivos con más de 15 años de experiencia 
            protegiendo la integridad de activos críticos en la industria petrolera.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Nuestra Historia</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fundada en 2008 por un equipo de ingenieros especializados en END, 
                Petro-NDT Solutions nació con la visión de proporcionar servicios de 
                inspección de clase mundial a la industria petrolera latinoamericana.
              </p>
              <p>
                Desde nuestros inicios, hemos crecido de ser una pequeña empresa local 
                a convertirnos en un referente regional, manteniendo siempre nuestro 
                compromiso con la excelencia técnica y la satisfacción del cliente.
              </p>
              <p>
                Hoy, con más de 500 proyectos completados exitosamente, continuamos 
                innovando y expandiendo nuestros servicios para satisfacer las necesidades 
                cambiantes de la industria.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-bold text-primary text-lg mb-2">Nuestra Misión</h4>
                <p className="text-muted-foreground">
                  Proteger la integridad de los activos petroleros de nuestros clientes 
                  mediante servicios de END de excelencia, contribuyendo a operaciones 
                  más seguras, eficientes y rentables.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6">
                <h4 className="font-bold text-accent text-lg mb-2">Nuestra Visión</h4>
                <p className="text-muted-foreground">
                  Ser la empresa de END de referencia en América Latina, reconocida 
                  por nuestra innovación tecnológica, excelencia operacional y 
                  compromiso con la seguridad industrial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-normal bg-card border-border">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Nuestro Equipo Directivo
            </h3>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
              Dirigidos por profesionales con décadas de experiencia en la industria petrolera 
              y END, nuestro equipo combina conocimiento técnico profundo con visión estratégica 
              para ofrecer soluciones integrales.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Dr. Carlos Mendoza</h4>
                <p className="text-sm text-muted-foreground">CEO & Fundador</p>
                <p className="text-xs text-muted-foreground mt-2">Ph.D. en Ing. Mecánica, ASNT Level III</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Ing. Ana Rodríguez</h4>
                <p className="text-sm text-muted-foreground">Directora Técnica</p>
                <p className="text-xs text-muted-foreground mt-2">M.Sc. END, API 510/570 Inspector</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Ing. Miguel Torres</h4>
                <p className="text-sm text-muted-foreground">Director de Operaciones</p>
                <p className="text-xs text-muted-foreground mt-2">B.Sc. Petrolera, PMP Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;