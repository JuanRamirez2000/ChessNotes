import type { Status, ChessRules, TimeClass } from "~/types/ChessComTypes";

interface ChessComPlayer {
  "@id": URL;
  avatar?: string;
  country: string;
  fide: number;
  followers: number;
  is_streamer: boolean;
  joined: number;
  last_online: number;
  league: string;
  location?: string;
  name?: string;
  player_id: number;
  status: Status;
  title?: string;
  tiwtch_url?: URL;
  url: URL;
  username: string;
  verified: boolean;
}

interface ReducedChessComPlayer {
  "@id": URL;
  rating: string;
  username: string;
  uuid: string;
}

interface MonthlyGamesLinks {
  archives: string[];
}

interface MonthlyGamesArchive {
  games: ChessComGame[];
}

interface ChessComGame {
  accurracies: {
    black: number;
    white: number;
  };
  black: ReducedChessComPlayer;
  end_time: number;
  fen: string;
  initial_setup: string;
  pgn: string;
  rated: string;
  rules: ChessRules;
  tcn: string;
  time_class: TimeClass;
  time_control: string;
  url: URL;
  uuid: string;
  white: ReducedChessComPlayer;
}

export type {
  ChessComPlayer,
  MonthlyGamesLinks,
  ChessComGame,
  MonthlyGamesArchive,
};
