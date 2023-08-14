import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { grabUsersMonthlyGames } from "~/helpers/grabUsersMonthlyGames";
import { TRPCError } from "@trpc/server";

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
        await ctx.prisma.chessUserProfile.upsert({
          where: {
            username: input.username,
          },
          update: {
            userID: ctx.auth.userId,
          },
          create: {
            userID: ctx.auth.userId,
            username: input.username,
            fide: input.fide,
            title: input.title,
            avatarURL: input.avatar,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected event occured, please try again",
          cause: error,
        });
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
      try {
        await clerkClient.users.updateUser(ctx.auth.userId!, {
          publicMetadata: {
            chessUsername: input.chessUsername,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected event occured, please try again",
          cause: error,
        });
      }
    }),
  saveGamesToPlayer: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const user = await clerkClient.users.getUser(ctx.auth.userId);
      const { chessUsername } = user.publicMetadata as UserPublicMetadata & {
        chessUsername: string;
      };
      const userGames = await grabUsersMonthlyGames(chessUsername);

      const renamedGames = userGames?.map(
        ({ time_class: timeClass, time_control: timeControl, ...game }) => ({
          timeClass,
          timeControl,
          ...game,
        })
      );
      if (userGames) {
        renamedGames?.map(async (game) => {
          let gameResult = "";
          switch (game.white.result) {
            case "win":
              gameResult = "white-win";
              break;
            case "checkmated":
              gameResult = "black-win";
            case "resigned":
              gameResult = "black-win";
              break;
            case "timeout":
              gameResult = "black-win";
              break;
            case "abandoned":
              gameResult = "black-win";
            case "lose":
              gameResult = "black-win";
              break;
            default:
              gameResult = "draw";
          }
          await ctx.prisma.chessComGame.create({
            data: {
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
              whiteUsername: game.white.username,
              blackUsername: game.black.username,
              gameResult: gameResult,
            },
          });
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected event occured, please try again",
        cause: error,
      });
    }
  }),
  getGamesFromChessUser: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.chessUserProfile.findUnique({
        where: {
          userID: ctx.auth.userId,
        },
        include: {
          games: {
            select: {
              game: {
                select: {
                  url: true,
                  rated: true,
                  timeClass: true,
                  timeControl: true,
                  gameResult: true,
                  whiteUsername: true,
                  blackUsername: true,
                  players: {
                    select: {
                      player: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (user) {
        const games = user.games.flatMap((game) => game.game);
        return games;
      }
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected event occured, please try again",
        cause: error,
      });
    }
  }),
});
