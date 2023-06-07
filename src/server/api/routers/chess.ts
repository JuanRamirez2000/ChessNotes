import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import axios from "axios";
import type {
  MonthlyGamesArchive,
  ChessComPlayer,
  MonthlyGamesLinks,
} from "~/interfaces/ChessInterfaces";
import { clerkClient } from "@clerk/nextjs";

const grabUsersMonthlyGames = async (chessComUsername: string) => {
  const archivesRes = await axios.get<MonthlyGamesLinks>(
    `https://api.chess.com/pub/player/${chessComUsername}/games/archives`
  );
  const multipleMonthRes = await axios.all(
    archivesRes.data.archives.map(
      async (url) => await axios.get<MonthlyGamesArchive>(url)
    )
  );

  const games = multipleMonthRes.flatMap((monthRes) => {
    if (monthRes.data) {
      return monthRes.data.games;
    }
  });
  return games;
};

export const chessRouter = createTRPCRouter({
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
  getChessComPlayerGames: publicProcedure
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
  //saveGamesToPlayer: protectedProcedure
  //  .input(
  //    z.object({
  //      chessUserName: z.string(),
  //    })
  //  )
  //  .mutation(async ({ ctx, input }) => {
  //    try {
  //      const games = grabUsersMonthlyGames(input.chessUserName)
  //      return await ctx.prisma.
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  }),
});
