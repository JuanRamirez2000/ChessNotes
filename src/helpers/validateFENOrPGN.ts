import { Chess, validateFen } from "chess.js";
import type PositionValidation from "~/interfaces/ChessGameValidation";

export const ValidateGameFENorPGN = (
  gameString: string
): PositionValidation => {
  const validation = validateFen(gameString);
  if (validation.ok) {
    return {
      validated: true,
      gameString: gameString,
      inputType: "fen",
    };
  }

  //Will only check PGN if FEN string failed
  //Chekcing by loading to a new chess object
  try {
    const chess = new Chess();
    chess.loadPgn(gameString, { newlineChar: "\n" });
    return {
      validated: true,
      gameString: gameString,
      inputType: "pgn",
    };
  } catch (error) {
    console.error("Error validating game string");
    return {
      validated: false,
      gameString: gameString,
      inputType: "pgn",
    };
  }
};
