import { type NextPage } from "next";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Link from "next/link";
//import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  //const { data: player } = api.chess.getChessComPlayerProfile.useQuery({
  //  chessUsername: "promking2000",
  //});
  //const { data: games } = api.chess.getChessComPlayerGames.useQuery({
  //  chessUsername: "promking2000",
  //});

  return (
    <>
      <Link
        className="rounded-lg bg-emerald-400 px-4 py-2 font-bold"
        href={"/user"}
      >
        UserPage
      </Link>
    </>
  );
};

export default Home;
