import axios from "axios";
import type {
  MonthlyGamesArchive,
  MonthlyGamesLinks,
} from "~/interfaces/ChessInterfaces";

export const grabUsersMonthlyGames = async (chessComUsername: string) => {
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
