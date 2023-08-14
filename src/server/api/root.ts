import { createTRPCRouter } from "~/server/api/trpc";
import { chessRouter } from "./routers/chess";
import { analysisRouter } from "./routers/analysis";
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chess: chessRouter,
  analysis: analysisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

//Used to infer type definitions from tanstack query
//This makes it so that we can import the router inputs/output types
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export const trpc = createTRPCReact<AppRouter>();
