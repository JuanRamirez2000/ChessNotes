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
import UserGamesTable from "~/features/UserGamesTable/UserGamesTable";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ErrorMessage } from "@hookform/error-message";
import { ValidateGameFENorPGN } from "~/helpers/validateFENOrPGN";
import { toast } from "react-toastify";

type GameFormInput = {
  notesTitle: string;
  gameFENorPGN: string;
};

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const NewAnalysis: NextPageWithLayout = () => {
  const router = useRouter();
  const mutation = api.analysis.createNewAnalysis.useMutation({
    onSuccess: async (data) => {
      toast.success("Analysis Created!");
      if (data) {
        await router.push(`/notes/${data.id}`);
      }
    },
    onError: () => {
      toast.error("Failed Creating Analysis");
    },
  });

  const [showGameHistory, setShowGameHistory] = useState<boolean>(false);
  const [enablePositionInput, setEnablePositionInput] =
    useState<boolean>(false);
  const {
    register: register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GameFormInput>({
    defaultValues: {
      gameFENorPGN: STARTING_FEN,
    },
  });

  const watchGameString = watch("gameFENorPGN", STARTING_FEN);

  const handleGameInputSubmit: SubmitHandler<GameFormInput> = (data) => {
    mutation.mutate({
      analysisTitle: data.notesTitle,
      gameString: data.gameFENorPGN,
    });
  };

  return (
    <div className="flex w-full flex-row">
      <div className="flex h-full w-1/3 flex-col">
        <h1 className="text-4xl font-bold">New analysis method</h1>
        <ul className="flex flex-col gap-2 text-cyan-100">
          <li>
            <button
              className="flex h-14 w-60 cursor-pointer flex-row items-center justify-start gap-2 rounded-lg border-b-8 border-b-gray-950 bg-gray-800 active:border-b"
              onClick={() => {
                mutation.mutate({ analysisTitle: "New Analysis" });
              }}
            >
              <FolderPlusIcon className="ml-2 h-9 w-9 rounded-lg" />
              <p className="text-xl font-semibold">New Game</p>
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
              <p className="text-xl font-semibold">Previous Game</p>
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
              <p className="text-xl font-semibold">Import PGN/FEN</p>
            </button>
          </li>
        </ul>

        {showGameHistory && <UserGamesTable />}
      </div>
      <div className="flex h-fit w-2/3 max-w-fit flex-col">
        <form className="flex w-full flex-row" key={"RegisterGame"}>
          <div className="relative grow">
            <input
              type="text"
              className="peer h-14 w-full rounded-md border-2 border-cyan-400 p-3 pt-4 placeholder-transparent caret-transparent focus:border-cyan-600 focus:shadow-sm focus:outline-none"
              placeholder="Magnus Carlson"
              {...register("notesTitle", {
                required: "Title is required",
              })}
            />
            <label
              htmlFor="analysisTitle"
              className="pointer-events-none absolute left-0 top-0 origin-left -translate-y-4 translate-x-0 scale-75 px-3 py-5 text-sm tracking-tight opacity-100 transition-all duration-100 ease-in-out 
              
              peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:translate-x-1 peer-placeholder-shown:scale-125
              
              peer-focus:-translate-y-4 peer-focus:translate-x-0 "
            >
              Title
            </label>
          </div>
          <button
            className="flex h-14 w-60 cursor-pointer flex-row items-center justify-start gap-2 rounded-lg border-b-8 border-b-gray-950 bg-gray-800 text-cyan-100 active:border-b"
            onClick={handleSubmit(handleGameInputSubmit)}
          >
            <ArrowDownTrayIcon className="ml-2 h-9 w-9 rounded-lg" />
            <p className="text-xl font-semibold">Save</p>
          </button>
          {enablePositionInput && (
            <textarea
              cols={30}
              rows={10}
              className="rounded-md border-2 border-cyan-400 outline-none focus:border-cyan-700"
              placeholder="Import a PGN or FEN"
              {...register("gameFENorPGN", {
                validate: {
                  validFENofPGN: (gameString) => {
                    const res = ValidateGameFENorPGN(gameString);
                    if (res.validated) {
                      return res.validated;
                    }
                    return "Invalid FEN or PGN";
                  },
                },
              })}
            ></textarea>
          )}
          <ErrorMessage errors={errors} name="notesTitle" />
          <ErrorMessage errors={errors} name="gameFENorPGN" />
        </form>
        <ChessBoardComponent startingPosition={watchGameString} />
      </div>
    </div>
  );
};

NewAnalysis.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default NewAnalysis;
