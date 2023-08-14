import { parseGame } from "@mliebelt/pgn-parser";

export default function PGNView({ pgn }: { pgn: string }) {
  const game = parseGame(pgn, { startRule: "game" });
  console.log(game.tags);
  return <></>;
}
