import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { grabUsersMonthlyGames } from "~/helpers/grabUsersMonthlyGames";

export const chessRouter = createTRPCRouter({
  savePlayerToPrisma: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        title: z.string().optional(),
        fide: z.number().optional(),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.chessUserProfile.create({
          data: {
            userID: ctx.auth.userId,
            username: input.username,
            fide: input.fide,
            title: input.title,
            avatarURL: input.avatar,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  savePlayerUsernameToClerk: publicProcedure
    .input(
      z.object({
        chessUsername: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      await clerkClient.users.updateUser(ctx.auth.userId!, {
        publicMetadata: {
          chessUsername: input.chessUsername,
        },
      });
    }),
  saveGamesToPlayer: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const user = await clerkClient.users.getUser(ctx.auth.userId);
      const { chessUsername } = user.publicMetadata as UserPublicMetadata & {
        chessUsername: string;
      };
      const userGames = await grabUsersMonthlyGames(chessUsername);

      const renamedGames = userGames?.map(
        ({
          time_class: timeClass,
          time_control: timeControl,

          ...game
        }) => ({ timeClass, timeControl, ...game })
      );

      if (userGames) {
        let chessRating = 0;
        renamedGames?.map(async (game) => {
          chessUsername === game.white.username
            ? (chessRating = game.white.rating)
            : (chessRating = game.white.rating);
          await ctx.prisma.chessComGame.create({
            data: {
              //playerAccuracies: {
              //  create: {
              //    black: game.accuracies.black,
              //    white: game.accuracies.white,
              //  },
              //},
              players: {
                create: [
                  {
                    player: {
                      connectOrCreate: {
                        where: { username: game.black.username },
                        create: {
                          username: game.black.username,
                          rating: game.black.rating,
                        },
                      },
                    },
                  },
                  {
                    player: {
                      connectOrCreate: {
                        where: { username: game.white.username },
                        create: {
                          username: game.white.username,
                          rating: game.white.rating,
                        },
                      },
                    },
                  },
                ],
              },
              fen: game.fen,
              pgn: game.pgn,
              rated: game.rated,
              url: game.url,
              timeClass: game.timeClass,
              timeControl: game.timeControl,
            },
          });
        });
        await ctx.prisma.chessUserProfile.update({
          where: {
            username: chessUsername,
          },
          data: {
            rating: chessRating,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }),
});
