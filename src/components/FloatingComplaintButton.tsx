import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const FloatingComplaintButton = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button variant="cta" size="sm" asChild className="shadow-lg rounded-full px-4 py-3 flex items-center gap-2">
                <a href="#reclamos" aria-label="Quejas y Apelaciones">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Quejas / Apelaciones</span>
                </a>
            </Button>
        </div>
    );
};

export default FloatingComplaintButton;
