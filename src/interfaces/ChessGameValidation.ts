export default interface PositionValidation {
  validated: boolean;
  gameString: string;
  inputType: "pgn" | "fen" | "error";
}
