import * as React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FileText } from "lucide-react";

const SM_BREAKPOINT = 640;

const FloatingComplaintButton = () => {
    const [isIconOnly, setIsIconOnly] = React.useState(
        () => typeof window !== "undefined" && window.innerWidth < SM_BREAKPOINT,
    );

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${SM_BREAKPOINT - 1}px)`);
        const onChange = () => setIsIconOnly(window.innerWidth < SM_BREAKPOINT);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <Tooltip open={isIconOnly ? undefined : false}>
                <TooltipTrigger asChild>
                    <a
                        href="#reclamos"
                        aria-label="Quejas y Apelaciones"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-accent px-4 py-3 text-accent-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                    >
                        <FileText className="w-4 h-4" />
                        <span className="hidden sm:inline">Quejas / Apelaciones</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent side="top">Quejas / Apelaciones</TooltipContent>
            </Tooltip>
        </div>
    );
};

export default FloatingComplaintButton;
