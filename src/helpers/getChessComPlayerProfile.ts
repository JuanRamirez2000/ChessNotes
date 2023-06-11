import axios from "axios";
import type { ChessComPlayer } from "~/interfaces/ChessInterfaces";

export const getChessComPlayerProfile = async (chessUsername: string) => {
  try {
    if (chessUsername) {
      const res = await axios.get<ChessComPlayer>(
        `https://api.chess.com/pub/player/${chessUsername}`
      );
      if (res.status === 200) {
        return res.data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
