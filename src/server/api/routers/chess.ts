import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import axios from "axios";
import type {
  MonthlyGamesArchive,
  ChessComPlayer,
  MonthlyGamesLinks,
  //ChessComGame,
} from "~/interfaces/ChessInterfaces";
import { clerkClient } from "@clerk/nextjs";

const grabUsersMonthlyGames = async (chessComUsername: string) => {
  try {
    const archivesRes = await axios.get<MonthlyGamesLinks>(
      `https://api.chess.com/pub/player/${chessComUsername}/games/archives`
    );
    const mostRecentMonth =
      archivesRes.data.archives[archivesRes.data.archives.length - 1];
    if (mostRecentMonth) {
      const {
        data: { games },
      } = await axios.get<MonthlyGamesArchive>(mostRecentMonth);
      return games;
    }
  } catch (error) {
    console.error(error);
  }
};
//! This code is meant for the endpoint above
//! The reason it is not working is because of chess.com's web api rate limit
//! A fix for this is to implement OAuth, which will be done some other time
//const multipleMonthRes = await axios.all(
//  archivesRes.data.archives.map(
//    async (url) => await axios.get<MonthlyGamesArchive>(url)
//  )
//);
//
//const games = multipleMonthRes.flatMap((monthRes) => {
//  if (monthRes.data) {
//    return monthRes.data.games;
//  }
//});

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
            playerId: ctx.auth.userId,
            username: input.username,
            fide: input.fide,
            title: input.title,
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
  getChessComPlayerProfile: publicProcedure
    .input(
      z.object({
        chessUsername: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const res = await axios.get<ChessComPlayer>(
          `https://api.chess.com/pub/player/${input.chessUsername}`
        );
        if (res.status === 200) {
          return res.data;
        }
      } catch (error) {
        //console.error(error);
      }
    }),
  getChessComPlayerGames: protectedProcedure
    .input(
      z.object({
        chessUsername: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const games = grabUsersMonthlyGames(input.chessUsername);
        return games;
      } catch (error) {
        console.error(error);
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
        ({
          time_class: timeClass,
          time_control: timeControl,

          ...game
        }) => ({ timeClass, timeControl, ...game })
      );
      if (userGames) {
        renamedGames?.map(async (game) => {
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
                          uuid: game.black.uuid,
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
                          uuid: game.white.uuid,
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
      }
    } catch (error) {
      console.error(error);
    }
  }),
});
