import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

export const analysisRouter = createTRPCRouter({
  createNewAnalysis: protectedProcedure
    .input(
      z.object({
        analysisTitle: z.string(),
        gameString: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await clerkClient.users.getUser(ctx.auth.userId);
        const { chessUsername } = user.publicMetadata as UserPublicMetadata & {
          chessUsername: string;
        };
        const newAnalysis = await ctx.prisma.chessNotebook.create({
          data: {
            title: input.analysisTitle,
            position: input.gameString,
            notebookAuthor: {
              connectOrCreate: {
                where: { userID: ctx.auth.userId },
                create: {
                  username: chessUsername,
                  userID: ctx.auth.userId,
                },
              },
            },
          },
        });
        return newAnalysis;
      } catch (error) {
        console.error(error);
      }
    }),
  grabAllAnalysisNotes: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userID = ctx.auth.userId;
      const userNotes = await ctx.prisma.chessNotebook.findMany({
        where: {
          notebookAuthor: {
            userID: userID,
          },
        },
      });
      if (userNotes) {
        return userNotes;
      }
    } catch (error) {
      console.error(error);
    }
  }),
  grabSingleAnalysisNotebook: protectedProcedure
    .input(
      z.object({
        notebookID: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const notebook = await ctx.prisma.chessNotebook.findUnique({
          where: {
            id: input.notebookID,
          },
        });
        return notebook;
      } catch (error) {
        console.error(error);
      }
    }),
  deleteAnalysisNotebook: protectedProcedure
    .input(
      z.object({
        notebookID: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.chessNotebook.delete({
          where: {
            id: input.notebookID,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
