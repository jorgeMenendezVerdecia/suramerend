/**
 * Cloudflare Pages Function – Email Sending Endpoint
 * Ruta: /api/email-send  (POST)
 *
 * Secret requerido (Pages → Settings → Environment Variables → Add secret):
 *   RESEND_API_KEY → tu API key de resend.com
 *
 * Acepta:
 *   - application/json      → formulario de cotizaciones (sin adjuntos)
 *   - multipart/form-data   → quejas/apelaciones (con adjuntos opcionales)
 */

// ── Tipos de Cloudflare Pages Function ───────────────────────────────────────

interface EventContext<Env> {
    request: Request;
    env: Env;
    waitUntil(promise: Promise<unknown>): void;
    passThroughOnException(): void;
    next(input?: Request | string, init?: RequestInit): Promise<Response>;
    params: Record<string, string | string[]>;
    data: Record<string, unknown>;
}

type PagesFunction<Env = Record<string, unknown>> = (
    context: EventContext<Env>
) => Response | Promise<Response>;

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

interface Env {
    RESEND_API_KEY: string;
}

interface FormPayload {
    subject: string;
    to: string;
    replyTo?: string;
    text: string;
    data: {
        company: string;
        fullName: string;
        phone: string;
        email: string;
        message: string;
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_RECIPIENTS = new Set([
    "comercial@suramerend.com",
    "operaciones@suramerend.com",
]);
const ALLOWED_ORIGINS = new Set([
    "https://www.suramerend.com",
    "https://suramerend.com",
]);
const FROM_ADDRESS = "noreply@suramerend.com";
const FROM_NAME = "Suramerend Web";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_FILE_SIZE = 10 * 1024 * 1024;   // 10 MB por archivo
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;  // 20 MB total adjuntos
const MAX_ATTACHMENTS = 5;

// ─────────────────────────────────────────────────────────────────────────────
// Utilidades
// ─────────────────────────────────────────────────────────────────────────────

/** Convierte un File en Base64 procesando en chunks para evitar stack overflow. */
async function fileToBase64(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const CHUNK = 8192;
    for (let i = 0; i < bytes.length; i += CHUNK) {
        binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    return btoa(binary);
}

// ─────────────────────────────────────────────────────────────────────────────
// Handlers de la Pages Function
// ─────────────────────────────────────────────────────────────────────────────

/** Escapa caracteres HTML para el cuerpo del email. */
function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildHtmlBody(data: FormPayload["data"], subject: string): string {
    const row = (label: string, value: string) =>
        `<tr>
      <td style="padding:8px 12px 8px 0;color:#666;font-size:13px;font-weight:bold;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:#333;font-size:14px;">${escapeHtml(value || "—")}</td>
    </tr>`;

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.10);max-width:600px;">

        <!-- Cabecera -->
        <tr>
          <td style="background:#003366;padding:28px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:0.5px;">Suramerend</h1>
            <p style="margin:6px 0 0;color:#90b8e8;font-size:13px;">${escapeHtml(subject)}</p>
          </td>
        </tr>

        <!-- Datos del remitente -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:bold;color:#003366;text-transform:uppercase;letter-spacing:0.5px;">Datos del remitente</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:6px;overflow:hidden;">
              ${row("Empresa", data.company)}
              ${row("Nombre", data.fullName)}
              ${row("Teléfono", data.phone)}
              ${row("Correo", data.email)}
            </table>
          </td>
        </tr>

        <!-- Mensaje -->
        <tr>
          <td style="padding:24px 32px 28px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:#003366;text-transform:uppercase;letter-spacing:0.5px;">Mensaje</p>
            <div style="background:#f9f9f9;border-left:4px solid #003366;border-radius:4px;padding:16px 20px;white-space:pre-wrap;font-size:14px;color:#444;line-height:1.7;">${escapeHtml(data.message || "—")}</div>
          </td>
        </tr>

        <!-- Pie -->
        <tr>
          <td style="background:#f5f7fa;padding:16px 32px;border-top:1px solid #eee;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
              Mensaje enviado automáticamente desde <a href="https://suramerend.com" style="color:#003366;text-decoration:none;">suramerend.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function corsHeaders(origin: string | null): HeadersInit {
    const allowed = origin && ALLOWED_ORIGINS.has(origin)
        ? origin
        : "https://www.suramerend.com";
    return {
        "Access-Control-Allow-Origin": allowed,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Vary": "Origin",
    };
}

/** Responde a la petición preflight OPTIONS */
export const onRequestOptions: PagesFunction = async ({ request }) => {
    const origin = request.headers.get("Origin");
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
};

/** Maneja POST /api/email-send */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const origin = request.headers.get("Origin");
    const json = (body: unknown, status = 200): Response =>
        new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });

    // 1. Detectar tipo de contenido y extraer campos
    const contentType = request.headers.get("Content-Type") ?? "";
    let subject = "", to = "", text = "";
    let replyTo: string | undefined;
    let data: FormPayload["data"] = { company: "", fullName: "", phone: "", email: "", message: "" };
    let attachmentFiles: File[] = [];

    if (contentType.includes("multipart/form-data")) {
        // Quejas / Apelaciones — puede incluir archivos adjuntos
        let form: FormData;
        try {
            form = await request.formData();
        } catch {
            return json({ error: "No se pudo procesar el formulario." }, 400);
        }
        subject = (form.get("subject") as string) ?? "";
        to = (form.get("to") as string) ?? "";
        replyTo = (form.get("replyTo") as string) || undefined;
        text = (form.get("text") as string) ?? "";
        try {
            data = JSON.parse((form.get("data") as string) ?? "{}");
        } catch {
            return json({ error: "El campo 'data' no es JSON válido." }, 400);
        }
        attachmentFiles = form
            .getAll("attachments")
            .filter((v): v is File => v instanceof File && v.size > 0);

        // Validar cantidad y tamaño de adjuntos
        if (attachmentFiles.length > MAX_ATTACHMENTS) {
            return json({ error: `Máximo ${MAX_ATTACHMENTS} archivos adjuntos permitidos.` }, 422);
        }
        for (const file of attachmentFiles) {
            if (file.size > MAX_FILE_SIZE) {
                return json({ error: `El archivo "${file.name}" excede el límite de 10 MB.` }, 422);
            }
        }
        const totalSize = attachmentFiles.reduce((sum, f) => sum + f.size, 0);
        if (totalSize > MAX_TOTAL_SIZE) {
            return json({ error: "El tamaño total de los adjuntos excede el límite de 20 MB." }, 422);
        }
    } else {
        // Cotizaciones — JSON sin adjuntos
        let payload: FormPayload;
        try {
            payload = (await request.json()) as FormPayload;
        } catch {
            return json({ error: "El cuerpo de la petición no es JSON válido." }, 400);
        }
        subject = payload?.subject ?? "";
        to = payload?.to ?? "";
        replyTo = payload?.replyTo;
        text = payload?.text ?? "";
        data = payload?.data ?? data;
    }

    // 2. Validar campos mínimos
    if (!subject || !to || !text || !data?.email) {
        return json({ error: "Faltan campos requeridos: subject, to, text, data.email." }, 422);
    }

    // 3. Verificar destinatario autorizado
    if (!ALLOWED_RECIPIENTS.has(to)) {
        return json({ error: "Destinatario no autorizado." }, 403);
    }

    // 4. Verificar que la API key esté configurada
    if (!env.RESEND_API_KEY) {
        console.error("[email-send] RESEND_API_KEY no está configurada.");
        return json({ error: "El servicio de email no está configurado." }, 503);
    }

    // 5. Construir adjuntos para Resend (base64)
    const attachments = await Promise.all(
        attachmentFiles.map(async (file) => ({
            filename: file.name,
            content: await fileToBase64(file),
        }))
    );

    // 6. Llamar a la API de Resend
    const htmlBody = buildHtmlBody(data, subject);
    const resendPayload: Record<string, unknown> = {
        from: `${FROM_NAME} <${FROM_ADDRESS}>`,
        to: [to],
        subject,
        html: htmlBody,
        text,
        ...(replyTo && { reply_to: replyTo }),
        ...(attachments.length > 0 && { attachments }),
    };

    try {
        const res = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resendPayload),
        });

        if (!res.ok) {
            const errBody = await res.text();
            console.error("[email-send] Resend error:", res.status, errBody);
            return json({ error: "No se pudo enviar el email." }, 500);
        }

        return json({ ok: true });
    } catch (err) {
        const msg = err instanceof Error ? err.message : "Error desconocido";
        console.error("[email-send] Error de red:", msg);
        return json({ error: `No se pudo enviar el email: ${msg}` }, 500);
    }
};
