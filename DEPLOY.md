# Suramerend WWW — Referencia de Despliegue

## Comandos rápidos

### Desarrollo local
```bash
npm run dev
```
Inicia el servidor en `http://localhost:5173`.  
**Nota:** las Pages Functions (`/api/email-send`) no se ejecutan en dev local a menos que uses Wrangler:
```bash
npx wrangler pages dev dist --port 8788
# (requiere hacer build primero)
```

### Build de producción
```bash
npm run build
```
Genera la carpeta `dist/`.

### Desplegar a Cloudflare Pages
```bash
npm run build && npx wrangler pages deploy dist --commit-dirty=true
```
- `--commit-dirty=true` permite desplegar aunque haya cambios sin commitear en git.
- El deploy genera una URL de preview única (ej. `https://abc123.suramerend-www.pages.dev`).
- El dominio de producción `https://www.suramerend.com` se actualiza automáticamente.

---

## Infraestructura

| Recurso                   | Valor                              |
| ------------------------- | ---------------------------------- |
| Proyecto Cloudflare Pages | `suramerend-www`                   |
| URL de Pages              | `https://suramerend-www.pages.dev` |
| Dominio producción        | `https://www.suramerend.com`       |
| Cuenta Cloudflare         | `menendezverdecia@gmail.com`       |
| Servicio de email         | [Resend.com](https://resend.com)   |
| Dominio verificado Resend | `suramerend.com`                   |
| Remitente                 | `noreply@suramerend.com`           |

### Destinos de email

| Formulario              | Destinatario                  |
| ----------------------- | ----------------------------- |
| Contacto / Cotizaciones | `cotizaciones@suramerend.com` |
| Quejas / Apelaciones    | `quejas@suramerend.com`       |

---

## Secrets y variables de entorno

El endpoint `/api/email-send` requiere el secret `RESEND_API_KEY`.

### Agregar o actualizar el secret
```bash
npx wrangler pages secret put RESEND_API_KEY --project-name suramerend-www
# Pega el valor cuando lo solicite
```

### Ver secrets configurados
```bash
npx wrangler pages secret list --project-name suramerend-www
```

También se puede gestionar desde el dashboard:  
**Workers & Pages → suramerend-www → Settings → Environment Variables**

---

## Autenticación con Wrangler

Si Wrangler pide login:
```bash
npx wrangler login
# Abre el navegador para autorizar con la cuenta de Cloudflare
```

---

## Seguridad configurada

- **CORS**: restringido a `https://www.suramerend.com` y `https://suramerend.com`
- **Adjuntos**: máx. 5 archivos, 10 MB por archivo, 20 MB total
- **Destinatarios**: lista blanca en `functions/api/email-send.ts` (`ALLOWED_RECIPIENTS`)
- **Rate limiting**: configurar en Cloudflare Dashboard → suramerend.com → Security → WAF → Rate limiting rules  
  _(Ruta: `POST /api/email-send`, umbral recomendado: 10 req/min por IP)_

---

## Archivos clave

| Archivo                                | Propósito                                    |
| -------------------------------------- | -------------------------------------------- |
| `functions/api/email-send.ts`          | Pages Function — endpoint de envío de emails |
| `wrangler.toml`                        | Configuración del proyecto Cloudflare Pages  |
| `src/components/ContactSection.tsx`    | Formulario de cotizaciones                   |
| `src/components/ComplaintsSection.tsx` | Formulario de quejas/apelaciones             |
| `src/assets/quejas-bpmn.webp`          | Diagrama BPMN del proceso de quejas          |
| `src/assets/apelaciones-bpmn.webp`     | Diagrama BPMN del proceso de apelaciones     |
