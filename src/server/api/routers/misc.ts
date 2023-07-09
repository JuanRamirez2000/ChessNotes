import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const miscRouter = createTRPCRouter({
  updateLikeFeatures: publicProcedure
    .input(
      z.object({
        featureName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        switch (input.featureName) {
          case "moveAnnotations":
            await ctx.prisma.featureLikes.update({
              where: {
                featureTableID: 1,
              },
              data: {
                moveAnnotations: {
                  increment: 1,
                },
              },
            });
            break;
          case "lineAnalysis":
            await ctx.prisma.featureLikes.update({
              where: {
                featureTableID: 1,
              },
              data: {
                lineAnalysis: {
                  increment: 1,
                },
              },
            });
            break;
          case "engineView":
            await ctx.prisma.featureLikes.update({
              where: {
                featureTableID: 1,
              },
              data: {
                engineView: {
                  increment: 1,
                },
              },
            });
            break;
          case "graphView":
            await ctx.prisma.featureLikes.update({
              where: {
                featureTableID: 1,
              },
              data: {
                graphView: {
                  increment: 1,
                },
              },
            });
            break;
          case "privateNotes":
            await ctx.prisma.featureLikes.update({
              where: {
                featureTableID: 1,
              },
              data: {
                privateNotes: {
                  increment: 1,
                },
              },
            });
            break;
          case "puiblicNotes":
            await ctx.prisma.featureLikes.update({
              where: {
                featureTableID: 1,
              },
              data: {
                publicNotes: {
                  increment: 1,
                },
              },
            });
            break;
        }
        //await ctx.prisma.featureLikes
      } catch (error) {
        console.error(error);
      }
    }),
  grabLikeFeatures: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.featureLikes.findUnique({
        where: {
          featureTableID: 1,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }),
});
