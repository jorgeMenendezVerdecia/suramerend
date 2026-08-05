var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/email-send.ts
var ALLOWED_RECIPIENTS = /* @__PURE__ */ new Set([
  "comercial@suramerend.com",
  "operaciones@suramerend.com"
]);
var ALLOWED_ORIGINS = /* @__PURE__ */ new Set([
  "https://www.suramerend.com",
  "https://suramerend.com"
]);
var FROM_ADDRESS = "noreply@suramerend.com";
var FROM_NAME = "Suramerend Web";
var RESEND_ENDPOINT = "https://api.resend.com/emails";
var RECAPTCHA_VERIFY = "https://www.google.com/recaptcha/api/siteverify";
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var MAX_TOTAL_SIZE = 20 * 1024 * 1024;
var MAX_ATTACHMENTS = 5;
async function fileToBase64(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const CHUNK = 8192;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}
__name(fileToBase64, "fileToBase64");
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escapeHtml, "escapeHtml");
function buildHtmlBody(data, subject, ticket) {
  const row = /* @__PURE__ */ __name((label, value) => `<tr>
      <td style="padding:8px 12px 8px 0;color:#666;font-size:13px;font-weight:bold;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:#333;font-size:14px;">${escapeHtml(value || "\u2014")}</td>
    </tr>`, "row");
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
                        ${ticket ? `<p style="margin:6px 0 0;color:#fff;font-size:13px;">N\xFAmero de ticket: <strong>${escapeHtml(ticket)}</strong></p>` : ""}
          </td>
        </tr>

        <!-- Datos del remitente -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:bold;color:#003366;text-transform:uppercase;letter-spacing:0.5px;">Datos del remitente</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:6px;overflow:hidden;">
              ${row("Empresa", data.company)}
              ${row("Nombre", data.fullName)}
              ${row("Tel\xE9fono", data.phone)}
              ${row("Correo", data.email)}
            </table>
          </td>
        </tr>

        <!-- Mensaje -->
        <tr>
          <td style="padding:24px 32px 28px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:#003366;text-transform:uppercase;letter-spacing:0.5px;">Mensaje</p>
            <div style="background:#f9f9f9;border-left:4px solid #003366;border-radius:4px;padding:16px 20px;white-space:pre-wrap;font-size:14px;color:#444;line-height:1.7;">${escapeHtml(data.message || "\u2014")}</div>
          </td>
        </tr>

        <!-- Pie -->
        <tr>
          <td style="background:#f5f7fa;padding:16px 32px;border-top:1px solid #eee;">
                        <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
                            Mensaje enviado autom\xE1ticamente desde <a href="https://suramerend.com" style="color:#003366;text-decoration:none;">suramerend.com</a>
                        </p>
                        ${ticket ? `<p style="margin:8px 0 0;font-size:12px;color:#666;text-align:center;">Conserve este n\xFAmero de ticket para seguimiento: <strong>${escapeHtml(ticket)}</strong></p>` : ""}
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
__name(buildHtmlBody, "buildHtmlBody");
function corsHeaders(origin) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://www.suramerend.com";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
__name(corsHeaders, "corsHeaders");
var onRequestOptions = /* @__PURE__ */ __name(async ({ request }) => {
  const origin = request.headers.get("Origin");
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}, "onRequestOptions");
var onRequestPost = /* @__PURE__ */ __name(async ({ request, env }) => {
  const origin = request.headers.get("Origin");
  const json = /* @__PURE__ */ __name((body, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
  }), "json");
  const contentType = request.headers.get("Content-Type") ?? "";
  let subject = "", to = "", text = "";
  let replyTo;
  let data = { company: "", fullName: "", phone: "", email: "", message: "" };
  let attachmentFiles = [];
  if (contentType.includes("multipart/form-data")) {
    let form2;
    try {
      form2 = await request.formData();
    } catch {
      return json({ error: "No se pudo procesar el formulario." }, 400);
    }
    subject = form2.get("subject") ?? "";
    to = form2.get("to") ?? "";
    replyTo = form2.get("replyTo") || void 0;
    text = form2.get("text") ?? "";
    try {
      data = JSON.parse(form2.get("data") ?? "{}");
    } catch {
      return json({ error: "El campo 'data' no es JSON v\xE1lido." }, 400);
    }
    attachmentFiles = form2.getAll("attachments").filter((v) => v instanceof File && v.size > 0);
    if (attachmentFiles.length > MAX_ATTACHMENTS) {
      return json({ error: `M\xE1ximo ${MAX_ATTACHMENTS} archivos adjuntos permitidos.` }, 422);
    }
    for (const file of attachmentFiles) {
      if (file.size > MAX_FILE_SIZE) {
        return json({ error: `El archivo "${file.name}" excede el l\xEDmite de 10 MB.` }, 422);
      }
    }
    const totalSize = attachmentFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      return json({ error: "El tama\xF1o total de los adjuntos excede el l\xEDmite de 20 MB." }, 422);
    }
  } else {
    let payload2;
    try {
      payload2 = await request.json();
    } catch {
      return json({ error: "El cuerpo de la petici\xF3n no es JSON v\xE1lido." }, 400);
    }
    subject = payload2?.subject ?? "";
    to = payload2?.to ?? "";
    replyTo = payload2?.replyTo;
    text = payload2?.text ?? "";
    data = payload2?.data ?? data;
  }
  if (!subject || !to || !text || !data?.email) {
    return json({ error: "Faltan campos requeridos: subject, to, text, data.email." }, 422);
  }
  let recaptchaToken;
  try {
    if (contentType.includes("multipart/form-data")) {
      recaptchaToken = form && form.get("recaptchaToken");
    } else {
      recaptchaToken = payload?.recaptchaToken;
    }
  } catch (e) {
    recaptchaToken = void 0;
  }
  if (recaptchaToken) {
    if (!env.RECAPTCHA_SECRET) {
      console.warn("[email-send] RECAPTCHA_SECRET not configured; skipping verification.");
    } else {
      try {
        const formbody = `secret=${encodeURIComponent(env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(recaptchaToken)}`;
        const verifyRes = await fetch(RECAPTCHA_VERIFY, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formbody
        });
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success || typeof verifyJson.score === "number" && verifyJson.score < 0.5) {
          console.warn("[email-send] reCAPTCHA verification failed", verifyJson);
          return json({ error: "reCAPTCHA verification failed." }, 403);
        }
      } catch (err) {
        console.error("[email-send] Error verifying reCAPTCHA", err);
        return json({ error: "Error verificando reCAPTCHA" }, 500);
      }
    }
  }
  if (!ALLOWED_RECIPIENTS.has(to)) {
    return json({ error: "Destinatario no autorizado." }, 403);
  }
  if (!env.RESEND_API_KEY) {
    console.error("[email-send] RESEND_API_KEY no est\xE1 configurada.");
    return json({ error: "El servicio de email no est\xE1 configurado." }, 503);
  }
  const attachments = await Promise.all(
    attachmentFiles.map(async (file) => ({
      filename: file.name,
      content: await fileToBase64(file)
    }))
  );
  const generateTicket = /* @__PURE__ */ __name(() => {
    const pad = /* @__PURE__ */ __name((n) => n.toString().padStart(2, "0"), "pad");
    const d = /* @__PURE__ */ new Date();
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `Q-${y}${m}${day}-${hh}${mm}${ss}-${rand}`;
  }, "generateTicket");
  const ticket = generateTicket();
  const htmlBody = buildHtmlBody(data, subject, ticket);
  const textWithTicket = `${text}

N\xFAmero de ticket: ${ticket}`;
  const resendPayload = {
    from: `${FROM_NAME} <${FROM_ADDRESS}>`,
    to: [to],
    subject: `${subject} [Ticket: ${ticket}]`,
    html: htmlBody,
    text: textWithTicket,
    ...replyTo && { reply_to: replyTo },
    ...attachments.length > 0 && { attachments }
  };
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resendPayload)
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("[email-send] Resend error:", res.status, errBody);
      return json({ error: "No se pudo enviar el email." }, 500);
    }
    return json({ ok: true, ticket });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    console.error("[email-send] Error de red:", msg);
    return json({ error: `No se pudo enviar el email: ${msg}` }, 500);
  }
}, "onRequestPost");

// _middleware.ts
var onRequest = /* @__PURE__ */ __name(async (ctx) => {
  if (ctx.env.MAINTENANCE_MODE === "true") {
    const url = new URL(ctx.request.url);
    if (url.pathname.startsWith("/maintenance.html") || url.pathname.startsWith("/favicon.ico") || url.pathname.startsWith("/og-image")) {
      return ctx.next();
    }
    const maintenanceUrl = new URL("/maintenance.html", ctx.request.url);
    const response = await ctx.env.ASSETS.fetch(maintenanceUrl.toString());
    return new Response(response.body, {
      status: 503,
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Retry-After": "3600",
        "Cache-Control": "no-store"
      }
    });
  }
  return ctx.next();
}, "onRequest");

// ../.wrangler/tmp/pages-n14B3V/functionsRoutes-0.3163027564966674.mjs
var routes = [
  {
    routePath: "/api/email-send",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/email-send",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest],
    modules: []
  }
];

// ../../../../.npm/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
