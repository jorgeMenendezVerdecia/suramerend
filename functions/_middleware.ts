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

    // Call downstream handler / asset fetch
    const response = await ctx.next();

    try {
        const url = new URL(ctx.request.url);

        // If a request for a JS module or an asset returns HTML (usually due to a cached
        // SPA fallback or service worker returning index.html), return a small recovery
        // JavaScript payload that unregisters service workers, clears caches and reloads
        // the page. This fixes clients that got stuck serving HTML for module scripts.
        const isJsModuleRequest = url.pathname.endsWith('.js') || url.pathname.startsWith('/assets/');

        if (isJsModuleRequest) {
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('text/html')) {
                const recoveryScript = `/* SURAMER-END: recovery script injected by middleware */\n(async function(){\n  try{\n    if('serviceWorker' in navigator){\n      const regs = await navigator.serviceWorker.getRegistrations();\n      for(const r of regs) try{ await r.unregister(); }catch(e){}\n    }\n    if('caches' in window){\n      const keys = await caches.keys();\n      await Promise.all(keys.map(k=>caches.delete(k)));\n    }\n  }catch(e){}\n  // Force reload to fetch real assets\n  try{ location.reload(true); }catch(e){ location.reload(); }\n})();`;

                return new Response(recoveryScript, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/javascript; charset=utf-8',
                        'Cache-Control': 'no-store, must-revalidate',
                    },
                });
            }
        }
    } catch (e) {
        // If anything fails here, fall back to the original response
    }

    return response;
};
