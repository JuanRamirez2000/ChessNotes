import {
  ArchiveBoxArrowDownIcon,
  ArrowDownTrayIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import type { NextPageWithLayout } from "../_app";
import { useState } from "react";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import ChessBoardComponent from "~/features/ChessBoard/ChessBoard";
import { type SubmitHandler, useForm } from "react-hook-form";
import UserGamesTable from "~/features/userGamesTable/UserGamesTable";

type GameFormInput = {
  gameString: string;
};

const NewAnalysis: NextPageWithLayout = () => {
  const [showGameHistory, setShowGameHistory] = useState<boolean>(false);
  const [enablePositionInput, setEnablePositionInput] =
    useState<boolean>(false);
  const [startingPosition, setStartingPosition] = useState<string>("");
  const { register, handleSubmit } = useForm<GameFormInput>();

  const handleGameInputSubmit: SubmitHandler<GameFormInput> = (data) => {
    setStartingPosition(data.gameString);
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex h-full w-1/3 flex-col">
        <h1 className="text-4xl font-bold">New analysis method</h1>
        <ul className="flex flex-col gap-2 text-cyan-100">
          <li>
            <button className="flex h-14 w-60 cursor-pointer flex-row items-center justify-start gap-2 rounded-lg border-b-8 border-b-gray-950 bg-gray-800 active:border-b">
              <FolderPlusIcon className="ml-2 h-9 w-9 rounded-lg" />
              <h2 className="text-xl font-semibold">New Game</h2>
            </button>
          </li>
          <li>
            <button
              className="flex h-14 w-60 cursor-pointer flex-row items-center justify-start gap-2 rounded-lg border-b-8 border-b-gray-950 bg-gray-800 active:border-b"
              onClick={() => {
                setEnablePositionInput(false);
                setShowGameHistory(true);
              }}
            >
              <ArchiveBoxArrowDownIcon className="ml-2 h-9 w-9 rounded-lg" />
              <h2 className="text-xl font-semibold">Previous Game</h2>
            </button>
          </li>
          <li>
            <button
              className="flex h-14 w-60 cursor-pointer flex-row items-center justify-start gap-2 rounded-lg border-b-8 border-b-gray-950 bg-gray-800 active:border-b"
              onClick={() => {
                setShowGameHistory(false);
                setEnablePositionInput(true);
              }}
            >
              <ArrowDownTrayIcon className="ml-2 h-9 w-9 rounded-lg" />
              <h2 className="text-xl font-semibold">Import PGN/FEN</h2>
            </button>
          </li>
        </ul>
        {enablePositionInput && (
          <form onSubmit={handleSubmit(handleGameInputSubmit)}>
            <textarea
              cols={30}
              rows={10}
              className="rounded-md border-2 border-cyan-400 outline-none focus:border-cyan-700"
              placeholder="Import a PGN or FEN"
              {...register("gameString")}
            ></textarea>
            <button type={"submit"}>Submit</button>
          </form>
        )}
        {showGameHistory && <UserGamesTable />}
      </div>
      <div className="flex h-fit w-2/3  justify-center">
        <ChessBoardComponent startingPosition={startingPosition} />
      </div>
    </div>
  );
};

NewAnalysis.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default NewAnalysis;
