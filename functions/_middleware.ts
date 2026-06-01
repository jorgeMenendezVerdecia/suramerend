/**
 * Cloudflare Pages Middleware – Modo Mantenimiento
 *
 * Activa la página de mantenimiento con la variable de entorno:
 *   MAINTENANCE_MODE=true
 *
 * Para activar:
 *   npx wrangler pages secret put MAINTENANCE_MODE   # poner "true"
 *   -- o en el Dashboard: Workers & Pages → suramerend-www →
 *      Settings → Environment Variables → Add variable
 *
 * Para desactivar: eliminar la variable o cambiar su valor a cualquier
 * cosa que no sea "true".
 */

export const onRequest: PagesFunction<{ MAINTENANCE_MODE: string }> = async (ctx) => {
    if (ctx.env.MAINTENANCE_MODE === "true") {
        const url = new URL(ctx.request.url);

        // Dejar pasar activos estáticos para que la página cargue correctamente
        if (
            url.pathname.startsWith("/maintenance.html") ||
            url.pathname.startsWith("/favicon.ico") ||
            url.pathname.startsWith("/og-image")
        ) {
            return ctx.next();
        }

        // Servir la página de mantenimiento con status 503
        const maintenanceUrl = new URL("/maintenance.html", ctx.request.url);
        const response = await ctx.env.ASSETS.fetch(maintenanceUrl.toString());

        return new Response(response.body, {
            status: 503,
            headers: {
                "Content-Type": "text/html;charset=UTF-8",
                "Retry-After": "3600",
                "Cache-Control": "no-store",
            },
        });
    }

    return ctx.next();
};
