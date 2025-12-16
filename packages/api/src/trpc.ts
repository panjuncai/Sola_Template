import { initTRPC } from "@trpc/server"

export type Context = {
  // Framework-agnostic context (extend later: session, db, etc.)
}

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
