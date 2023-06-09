import { createTRPCRouter } from "~/server/api/trpc";
import { chessRouter } from "./routers/chess";
import { analysisRouter } from "./routers/analysis";
import { miscRouter } from "./routers/misc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chess: chessRouter,
  analysis: analysisRouter,
  misc: miscRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
