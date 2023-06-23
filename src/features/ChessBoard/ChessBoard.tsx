import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, PieceSymbol, validateFen } from "chess.js";
import type { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { ArrowPathIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
type move =
  | string
  | {
      from: string;
      to: string;
      promotion?: string | undefined;
    };

interface PositionValidation {
  validated: boolean;
  gameString: string;
  inputType: "pgn" | "fen" | "error";
}

const validateStartingInput = (gameString: string): PositionValidation => {
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

export default function ChessBoardComponent({
  startingPosition,
}: {
  startingPosition: string;
}) {
  //* ChessGameConfiguration
  const [game, setGame] = useState<Chess>(new Chess());
  const [boardOrientationControl, setBoardOrientationControl] = useState<
    "white" | "black"
  >("white");
  const [moveOptions, setMoveOptions] = useState({});

  useEffect(() => {
    const { validated, gameString, inputType } =
      validateStartingInput(startingPosition);
    if (validated) {
      if (inputType === "fen") {
        setGame(new Chess(gameString));
      }
      if (inputType === "pgn") {
        const newGame = new Chess();
        newGame.loadPgn(gameString, { newlineChar: "\n" });
        setGame(newGame);
      }
    }
  }, [startingPosition]);

  const getMoveOptions = (piece: Piece) => {
    const moves = game.moves({
      piece: piece[1]?.toLowerCase() as PieceSymbol,
      //verbose: true
    });
    console.log(moves);
  };

  const makeAMove = (move: move) => {
    const gameCopy = new Chess();
    gameCopy.loadPgn(game.pgn());
    gameCopy.move(move);
    setGame(gameCopy);
  };

  const onDrop = (
    sourceSquare: Square,
    targetSquare: Square,
    _piece: Piece
  ) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    //invalid move
    if (move === null) return false;
    return true;
  };

  return (
    <div className="max-h-fit min-h-min min-w-min max-w-fit">
      <div className="bg-cyan-950 p-2">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          onPieceClick={getMoveOptions}
          showBoardNotation={true}
          boardOrientation={boardOrientationControl}
          customDarkSquareStyle={{ backgroundColor: "#0e7490" }}
          customLightSquareStyle={{ backgroundColor: "#edeed1" }}
          boardWidth={600}
        />
      </div>
      <div className="mt-1 flex flex-row justify-between">
        <button
          className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b"
          onClick={() => setGame(new Chess())}
        >
          <ArrowPathIcon className="ml-1 h-6 w-6" />
          <p>Reset</p>
        </button>
        <button
          className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b"
          onClick={() =>
            setBoardOrientationControl((prev) =>
              prev === "white" ? "black" : "white"
            )
          }
        >
          <ArrowsUpDownIcon className="ml-1 h-6 w-6" />
          <p>Switch Board</p>
        </button>
      </div>
    </div>
  );
}
