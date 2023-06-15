import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
//import { shadesOfPurple } from "@clerk/themes";
import Link from "next/link";

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
      {/* Hero Section*/}
      <div className="flex h-screen w-screen items-center justify-center">
        <h1>Chess Notes</h1>
      </div>
      {user.user?.publicMetadata.chessUsername ? (
        <Link
          className="rounded-lg bg-emerald-400 px-4 py-2 font-bold"
          href="/user"
        >
          UserPage
        </Link>
      ) : (
        <Link href="/user-sign-up">Connect Chess Account</Link>
      )}
    </>
  );
};

export default Home;
