import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <div className="h-screen w-screen">
      {user.user?.publicMetadata.chessUsername ? (
        <Link href="/user">
          <button className="duration-400 w-full rounded-lg bg-gradient-to-br from-cyan-400 to-sky-800 px-4 py-2 text-xl text-sky-100 transition hover:scale-105 hover:cursor-pointer hover:from-sky-600 hover:to-sky-950">
            Sign In
          </button>
        </Link>
      ) : (
        <Link href="/user-sign-up" className="h-full w-full">
          <button className="duration-400 w-full rounded-lg bg-gradient-to-br from-cyan-400 to-sky-800 px-4 py-2 text-xl text-sky-100 transition hover:scale-105 hover:cursor-pointer hover:from-sky-600 hover:to-sky-950">
            Start notating your games!
          </button>
        </Link>
      )}
    </div>
  );
};

export default Home;
