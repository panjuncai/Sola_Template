import { createTRPCReact } from "@trpc/react-query"

import type { AppRouter } from "@sola/server/src/index"

export const trpc = createTRPCReact<AppRouter>()
