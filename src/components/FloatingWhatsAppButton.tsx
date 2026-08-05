import * as React from "react";
import { Phone } from "lucide-react";

const FloatingWhatsAppButton = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <a
                href="https://wa.me/593994723972?text=Hola%2C%20necesito%20asistencia%20inmediata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp 24/7"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp 24/7</span>
            </a>
        </div>
    );
};

export default FloatingWhatsAppButton;
