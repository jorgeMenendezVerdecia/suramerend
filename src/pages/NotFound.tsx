import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-8"
      style={{ background: "linear-gradient(135deg, #001428 0%, #002a5c 100%)" }}
    >
      <div className="w-full max-w-[560px] text-center" style={{ color: "#f0f4ff" }}>
        {/* Icono */}
        <div
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(255, 119, 0, 0.15)" }}
        >
          <FileQuestion
            size={40}
            strokeWidth={1.8}
            style={{ color: "#ff7700" }}
          />
        </div>

        {/* Marca */}
        <p
          className="mb-5 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "#ff7700" }}
        >
          SurAmerend – Ensayos No Destructivos
        </p>

        {/* Título */}
        <h1
          className="mb-5 font-bold leading-tight"
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)" }}
        >
          Página no encontrada
        </h1>

        {/* Divisor */}
        <div
          className="mx-auto mb-10 h-[3px] w-12 rounded-full"
          style={{ background: "#ff7700" }}
        />

        {/* Descripción */}
        <p
          className="mb-10 text-[1.05rem] leading-relaxed"
          style={{ color: "rgba(240, 244, 255, 0.75)" }}
        >
          La ruta <code className="font-mono text-sm opacity-80">{location.pathname}</code> no existe
          o fue movida.<br />
          Verifique la dirección o regrese al inicio.
        </p>

        {/* Botón de regreso */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[0.95rem] font-medium transition-all"
          style={{
            background: "rgba(255, 119, 0, 0.12)",
            border: "1px solid rgba(255, 119, 0, 0.35)",
            color: "#ff9933",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 119, 0, 0.22)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 119, 0, 0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 119, 0, 0.12)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 119, 0, 0.35)";
          }}
        >
          ← Volver al inicio
        </button>

        {/* Pie */}
        <p
          className="mt-12 text-[0.8rem]"
          style={{ color: "rgba(240, 244, 255, 0.35)" }}
        >
          &copy; 2026 SURAMER END S.A. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
