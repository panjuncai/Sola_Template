import cors from "@fastify/cors"
import Fastify from "fastify"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"

import { appRouter } from "./appRouter.js"

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
  },
})

await server.listen({
  port: 6001,
  host: "0.0.0.0",
})
