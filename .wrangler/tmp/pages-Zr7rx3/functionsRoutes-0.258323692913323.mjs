import { onRequestOptions as __api_email_send_ts_onRequestOptions } from "/Users/jorge.menendez/Developer/suramerend/www/functions/api/email-send.ts"
import { onRequestPost as __api_email_send_ts_onRequestPost } from "/Users/jorge.menendez/Developer/suramerend/www/functions/api/email-send.ts"
import { onRequest as ___middleware_ts_onRequest } from "/Users/jorge.menendez/Developer/suramerend/www/functions/_middleware.ts"

export const routes = [
    {
      routePath: "/api/email-send",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_email_send_ts_onRequestOptions],
    },
  {
      routePath: "/api/email-send",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_email_send_ts_onRequestPost],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]