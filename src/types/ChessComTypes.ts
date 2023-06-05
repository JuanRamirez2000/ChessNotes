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

export type { Status, ChessRules, TimeClass };
