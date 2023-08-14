import Image from "next/image";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import {
  MagnifyingGlassIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";
import type { ChessComPlayer } from "~/interfaces/ChessInterfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getChessComPlayerProfile } from "~/helpers/getChessComPlayerProfile";

interface FormInputs {
  chessUsername: string;
}

export default function UserSignuUp() {
  const [player, setChessPlayer] = useState<ChessComPlayer | undefined>();
  const router = useRouter();

  const chessUserMutation = api.chess.savePlayerToPrisma.useMutation({
    onSuccess: async () => {
      toast.success("User Saved To Databse!");
      await router.push("/user");
    },
    onError: () => {
      toast.error("Failed Saving User");
    },
  });

  const clerkMutation = api.chess.savePlayerUsernameToClerk.useMutation({
    onSuccess: async () => {
      toast.success("User Saved!");
      await router.push("/user");
    },
    onError: () => {
      toast.error("Failed Saving User");
    },
  });
  const fetchChessProfile = async (chessUsername: string) => {
    try {
      const profile = await getChessComPlayerProfile(chessUsername);

      if (profile) {
        toast.success("User Found!");
        return profile;
      } else {
        toast.error("No User Found");
        return undefined;
      }
    } catch (error) {
      toast.error("No User Found!");
      console.error(error);
    }
  };

  const connectPlayer = () => {
    if (player) {
      clerkMutation.mutate({ chessUsername: player.username });
      chessUserMutation.mutate({
        username: player.username,
        fide: player.fide,
        title: player.title,
        avatar: player.avatar,
      });
    }
  };

  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setChessPlayer(await fetchChessProfile(data.chessUsername));
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-full max-w-lg flex-none rounded-lg bg-slate-800 p-10 tracking-wide shadow-lg">
        <div className="relative h-52 w-full ">
          <Image
            src={"/assets/images/chessBackground1.jpg"}
            alt="chessBackground"
            fill={true}
            className="rounded-lg object-cover object-center"
          />
        </div>
        <h2 className="my-2 text-2xl">Connect an account</h2>
        <p className="text-md">
          All we ever store is your username! Everything else is brought by
          Chess.com!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="my-4">
          <div className="relative my-4">
            <input
              type="text"
              className="peer h-16 w-full rounded-md border-2 bg-slate-500 p-3 pt-4 placeholder-transparent caret-transparent focus:border-emerald-300 focus:shadow-sm focus:outline-none"
              {...register("chessUsername", { required: true })}
              placeholder="Magnus Carlson"
            />
            <label
              htmlFor="chessUsername"
              className="pointer-events-none absolute left-0 top-0 origin-left -translate-y-4 translate-x-0 scale-75 px-3 py-5 text-sm tracking-tight opacity-100 transition-all duration-100 ease-in-out 
              
              peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:translate-x-1 peer-placeholder-shown:scale-125
              
              peer-focus:-translate-y-4 peer-focus:translate-x-0 "
            >
              Chess.com Username
            </label>
            <Image
              src="/assets/svgs/chessKing.svg"
              height={24}
              width={24}
              alt="chessKingPiece"
              className="absolute right-0 top-0 -translate-x-2 translate-y-5 scale-150"
            />
          </div>
          <div className="flex items-end justify-between">
            <button
              type="submit"
              className="rounded-lg bg-emerald-400 px-2 py-2 hover:bg-emerald-500"
            >
              Find Account
              <MagnifyingGlassIcon className="ml-2 inline h-5 w-5" />
            </button>
          </div>
        </form>
        {player && (
          <div className="flex max-w-md items-center justify-center gap-4">
            <Image
              src={
                player.avatar
                  ? player.avatar
                  : "/assets/images/chessKingIcon.jpg"
              }
              height={128}
              width={128}
              alt="player avatar"
              className="rounded-md"
            />
            <div>
              <h2>{player.username}</h2>
              <button
                className="rounded-lg bg-emerald-400 px-2 py-2 hover:bg-emerald-500"
                onClick={connectPlayer}
              >
                Save user
                <ArrowDownOnSquareIcon className="ml-2 inline h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
