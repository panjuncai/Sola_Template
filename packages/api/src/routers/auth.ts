import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { auth, applySetCookieHeaders } from "../auth.js"
import { router, publicProcedure } from "../trpc.js"

function toHeaders(input: import("node:http").IncomingHttpHeaders) {
  const headers = new Headers()
  for (const [key, value] of Object.entries(input)) {
    if (value == null) continue
    if (Array.isArray(value)) headers.set(key, value.join(","))
    else headers.set(key, value)
  }
  return headers
}

function resolveAuthUrl(path: string) {
  const baseURL = auth.options.baseURL ?? "http://localhost:6001"
  const basePath = auth.options.basePath ?? "/api/auth"
  const normalizedBase = baseURL.replace(/\/$/, "")
  const normalizedPath = `${basePath.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`
  return `${normalizedBase}${normalizedPath}`
}

async function callAuthEndpoint<T>(
  ctx: { req: import("node:http").IncomingMessage; res: import("node:http").ServerResponse },
  path: string,
  init: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const headers = toHeaders(ctx.req.headers)

  if (init.json !== undefined) {
    headers.set("content-type", "application/json")
  }

  const request = new Request(resolveAuthUrl(path), {
    method: init.method ?? "GET",
    headers,
    ...(init.json !== undefined
      ? { body: JSON.stringify(init.json) }
      : init.body !== undefined
        ? { body: init.body }
        : {}),
  })

  const response = await auth.handler(request)
  applySetCookieHeaders(response, ctx.res)

  const text = await response.text()
  const data = text ? (JSON.parse(text) as unknown) : null

  if (!response.ok) {
    const message =
      (data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as any).message === "string" &&
        (data as any).message) ||
      `Auth request failed (${response.status})`

    throw new TRPCError({
      code: "BAD_REQUEST",
      message,
    })
  }

  return data as T
}

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return callAuthEndpoint(ctx, "/sign-up/email", {
        method: "POST",
        json: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      })
    }),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return callAuthEndpoint(ctx, "/sign-in/email", {
        method: "POST",
        json: {
          email: input.email,
          password: input.password,
        },
      })
    }),

  signOut: publicProcedure.mutation(async ({ ctx }) => {
    return callAuthEndpoint(ctx, "/sign-out", {
      method: "POST",
    })
  }),

  getSession: publicProcedure.query(async ({ ctx }) => {
    return callAuthEndpoint(ctx, "/get-session", {
      method: "GET",
    })
  }),
})
