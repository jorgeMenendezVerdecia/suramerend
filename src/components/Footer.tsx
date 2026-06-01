import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SURAMER END S.A.</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              Líderes en ensayos no destructivos para la industria petrolera con más de
              15 años de experiencia y certificaciones internacionales.
            </p>

          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Servicios END</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Ultrasonido pulso eco</li>
              <li>Ultrasonido pos haz angular</li>
              <li>Inspección electromagnética por fuga de campo</li>
              <li>Tintas penetrantes</li>
              <li>Partículas magnéticas</li>
              <li>Inspección visual y dimensional</li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-4">Industrias</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Exploración y Producción</li>
              <li>Refinación</li>
              <li>Petroquímica</li>
              <li>Minería</li>
              <li>Aviación</li>
              <li>Industria en general</li>
              <li>Offshore</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Hungurahua S/N, Robles y Laureles</p>
                  <p>Francisco de Orellana, Ecuador</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p>+593 994 723 972</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <p>operaciones@suramerend.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/80">
              © {currentYear} SURAMER END S.A. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/80">
              <a href="#" className="hover:text-primary-foreground transition-colors duration-normal">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors duration-normal">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors duration-normal">
                Certificaciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;