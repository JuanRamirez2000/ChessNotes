type Status =
  | "closed"
  | "closed:fair_play_violations"
  | "basic"
  | "premium"
  | "mod"
  | "staff";

type ChessRules =
  | "chess"
  | "chess960"
  | "bughouse"
  | "kingofthehill"
  | "threecheck"
  | "crazyhouse";

type TimeClass = "daily" | "rapid" | "blitz" | "bullet";

type GameResult =
  | "win"
  | "checkmated"
  | "agreed"
  | "repitiion"
  | "timeout"
  | "resigned"
  | "stalemate"
  | "lose"
  | "insufficient"
  | "50move"
  | "abandoned";

export type { Status, ChessRules, TimeClass, GameResult };
