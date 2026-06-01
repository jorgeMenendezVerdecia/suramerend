# Suramerend WWW

Sitio web corporativo de Suramerend construido con React, Vite y Cloudflare Pages.

## Resumen del proyecto

- App SPA con rutas gestionadas por `react-router-dom`.
- Secciones principales: navegación, hero, servicios, tecnologías, acerca de, quejas/apelaciones, contacto y pie de página.
- Formulario de contacto y envío de emails a través de Cloudflare Pages Function `/api/email-send`.
- Soporte de modo mantenimiento mediante middleware Cloudflare y `public/maintenance.html`.

## Tecnología

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn-ui / Radix UI
- Cloudflare Pages Functions
- Resend.com para envío de emails
- React Query (`@tanstack/react-query`)

## Estructura clave

- `src/App.tsx` — router principal y provider de React Query
- `src/pages/Index.tsx` — página única principal
- `src/pages/NotFound.tsx` — ruta catch-all
- `src/components/ContactSection.tsx` — formulario de cotizaciones
- `src/components/ComplaintsSection.tsx` — formulario de quejas/apelaciones
- `functions/api/email-send.ts` — endpoint de envío de emails
- `functions/_middleware.ts` — middleware de mantenimiento
- `wrangler.toml` — configuración de Cloudflare Pages
- `public/maintenance.html` — página de mantenimiento

## Configuración local

### Requisitos

- Node.js
- npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173`.

> Nota: las Pages Functions no se ejecutan automáticamente en el servidor Vite. Para probar `functions/api/email-send.ts` en local necesitas usar Wrangler y hacer build primero.

```bash
npm run build
npx wrangler pages dev dist --port 8788
```

## Scripts disponibles

- `npm run dev` — arranca el modo desarrollo con HMR
- `npm run build` — construye la app en `dist/`
- `npm run build:dev` — build de Vite en modo development
- `npm run preview` — preview local de la carpeta `dist/`
- `npm run lint` — ejecuta ESLint en el repositorio

## Despliegue

### Build de producción

```bash
npm run build
```

### Despliegue a Cloudflare Pages

```bash
npm run build && npx wrangler pages deploy dist --commit-dirty=true
```

### Variables de entorno / secrets

- `RESEND_API_KEY` — API key de Resend.com necesaria para `/api/email-send`
- `MAINTENANCE_MODE` — activar modo mantenimiento en Cloudflare Pages cuando su valor sea `true`

#### Configurar secret en Wrangler

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name suramerend-www
```

#### Activar modo mantenimiento

```bash
npx wrangler pages secret put MAINTENANCE_MODE --project-name suramerend-www
# y escribe true
```

## Detalles del endpoint de email

- Ruta: `POST /api/email-send`
- Funciona con `application/json` y `multipart/form-data`
- Permite adjuntos opcionales
- Destinatarios permitidos:
  - `comercial@suramerend.com`
  - `operaciones@suramerend.com`
- Orígenes permitidos para CORS:
  - `https://www.suramerend.com`
  - `https://suramerend.com`

## Notas de despliegue

- El middleware `functions/_middleware.ts` redirige a `public/maintenance.html` cuando `MAINTENANCE_MODE=true`.
- `wrangler.toml` usa `pages_build_output_dir = "dist"` y `compatibility_date = "2025-05-01"`.

## Buenas prácticas

- Mantener los secretos fuera del repositorio.
- Verificar `RESEND_API_KEY` antes de desplegar envíos de correo.
- Controlar la regla de rate limiting para `POST /api/email-send` en Cloudflare.

## Contacto para desarrolladores

- Código base principal en `src/`
- Funciones de backend en `functions/`
- Activos estáticos en `public/`
- Configuración de build y deploy en `vite.config.ts` y `wrangler.toml`
