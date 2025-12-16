import cors from "@fastify/cors"
import Fastify from "fastify"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"

import { appRouter, type Context } from "@sola/api"

const server = Fastify({
  logger: true,
})

await server.register(cors, {
  origin: true,
})

await server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext: (): Context => ({}),
  },
})

await server.listen({
  port: 6001,
  host: "0.0.0.0",
})
