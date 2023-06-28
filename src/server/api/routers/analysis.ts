import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";

export const analysisRouter = createTRPCRouter({
  createNewAnalysisWithoutInput: protectedProcedure.mutation(
    async ({ ctx }) => {
      try {
        const user = await clerkClient.users.getUser(ctx.auth.userId);
        const { chessUsername } = user.publicMetadata as UserPublicMetadata & {
          chessUsername: string;
        };
        await ctx.prisma.chessNotebook.create({
          data: {
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
      } catch (error) {
        console.error(error);
      }
    }
  ),
});
