import { router, publicProcedure } from "./trpc.js"

export const appRouter = router({
  health: publicProcedure.query(() => "Sola API (Fastify) is running"),
})

export type AppRouter = typeof appRouter
