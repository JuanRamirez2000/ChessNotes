import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import axios from "axios";
import type {
  MonthlyGamesArchive,
  ChessComPlayer,
  MonthlyGamesLinks,
} from "~/interfaces/ChessInterfaces";

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
  //getChessNotes: protectedProcedure.query(async ({ ctx }) => {
  //  const notes = await ctx.prisma.chessNotes.findMany({
  //    where: {
  //      authorID: ctx.auth.userId,
  //    },
  //  });
  //  return notes;
  //}),
  getChessComPlayerProfile: publicProcedure
    .input(
      z.object({
        chessUsername: z.string(),
      })
    )
    .query(async ({ input }) => {
      const res = await axios.get<ChessComPlayer>(
        `https://api.chess.com/pub/player/${input.chessUsername}`
      );
      if (res.status === 200) {
        return res.data;
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
