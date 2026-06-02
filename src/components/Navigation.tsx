import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.webp";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const logoAnchorRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkOverlap = () => {
      // If not desktop (mobile/hamburger), always show the logo
      if (!isDesktop) {
        setHideLogo(false);
        return;
      }
      const logoEl = logoAnchorRef.current;
      const menuEl = menuRef.current;
      if (!logoEl || !menuEl) {
        setHideLogo(false);
        return;
      }
      const logoRect = logoEl.getBoundingClientRect();
      const menuRect = menuEl.getBoundingClientRect();
      // If the menu is hidden (width 0) treat as non-overlapping
      if (menuRect.width === 0) {
        setHideLogo(false);
        return;
      }
      const padding = 8; // px buffer
      // If the right edge of the logo overlaps or is too close to the left edge of the menu
      if (logoRect.right + padding > menuRect.left) setHideLogo(true);
      else setHideLogo(false);
    };

    // run on mount and when desktop state changes
    checkOverlap();
    window.addEventListener("resize", checkOverlap, { passive: true });
    window.addEventListener("scroll", checkOverlap, { passive: true });
    return () => {
      window.removeEventListener("resize", checkOverlap);
      window.removeEventListener("scroll", checkOverlap);
    };
  }, [isDesktop]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handle = () => setIsDesktop(mq.matches);
    // init
    handle();
    // listen
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Tecnologías", href: "#tecnologias" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 overflow-visible">
          {/* Logo - flotante sobre la barra */}
          <div className="self-start pt-1">
            <a
              href="#inicio"
              ref={logoAnchorRef}
              className={`inline-block rounded-xl border-2 border-primary bg-white p-1.5 shadow-lg transition-opacity duration-200 ${hideLogo ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <img
                src={logo}
                alt="SURAMER END S.A."
                className={`w-auto transition-all duration-300 ease-in-out ${!isDesktop ? "h-14" : scrolled ? "h-14" : "h-32"}`}
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div ref={menuRef} className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-normal"
              >
                {item.name}
              </a>
            ))}
            <Button variant="cta" size="sm" className="ml-4" asChild>
              <a href="#contacto">
                <Phone className="w-4 h-4 mr-2" />
                Solicitar Cotización
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-normal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="cta" size="sm" className="w-full" asChild>
                  <a href="#contacto" onClick={() => setIsMenuOpen(false)}>
                    <Phone className="w-4 h-4 mr-2" />
                    Solicitar Cotización
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;