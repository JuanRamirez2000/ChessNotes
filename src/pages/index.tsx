import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

//https://storyset.com/

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      {/* Hero Section */}
      <div className="h-1/2 w-full lg:h-full">
        <div className="relative flex h-full w-full flex-col-reverse items-center justify-center gap-10 text-black lg:flex-row lg:gap-0">
          {/* blurred blobs*/}
          <div className="absolute left-0 top-[10%] -z-10 h-64 w-64 rounded-full bg-gradient-radial from-emerald-500 opacity-70 blur-xl" />
          <div className="absolute bottom-[10%] right-0 -z-10 h-64 w-64 rounded-full bg-gradient-radial from-emerald-500 opacity-70 blur-xl md:right-1/4 lg:right-1/3" />

          <div className="z-0 flex h-1/3 w-full flex-col items-center justify-center lg:h-full lg:w-1/2">
            <div className="flex max-w-md flex-col items-center gap-6 text-center">
              <h1 className="text-4xl font-semibold tracking-tighter md:text-5xl">
                <span className="underline decoration-emerald-400 decoration-solid decoration-4 ">
                  Study and Analyze
                </span>{" "}
                your chess games
              </h1>
              <p className="max-w-xs text-lg md:text-xl">
                With features tailored to help you annotate your gameplay
              </p>
              {user.user?.publicMetadata.chessUsername ? (
                <Link href="/user">
                  <button className="duration-400 w-2/3 min-w-fit rounded-lg bg-emerald-400 px-4 py-2 text-xl text-emerald-950 transition hover:scale-105 hover:cursor-pointer">
                    Sign In
                  </button>
                </Link>
              ) : (
                <Link href="/user-sign-up" className="h-full w-full">
                  <button className="duration-400 w-2/3 min-w-fit rounded-lg bg-emerald-400 px-4 py-2 text-xl text-emerald-950 transition hover:scale-105 hover:cursor-pointer">
                    Start notating your games!
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex h-1/3 w-2/3 flex-col items-center justify-center md:h-1/2 lg:h-2/3 lg:w-1/2">
            <div className="relative h-full w-full">
              <Image
                src={"/assets/svgs/chess-animate.svg"}
                fill
                alt="Chess Studying"
              />
            </div>
          </div>
        </div>
        {/* Features */}
      </div>
      <div className="min-h-fit w-full bg-emerald-400">
        <ul className="flex h-full w-full flex-col items-center justify-around gap-8 py-10 lg:flex-row">
          <li className="flex h-72 w-96 flex-col items-center gap-2 rounded-xl bg-slate-900 p-4 text-center text-emerald-50 shadow-sm">
            <h2 className="text-3xl font-medium tracking-tight">
              PGN/FEN/Chess.com Game Import
            </h2>
            <p className="max-w-xs text-lg tracking-wide">
              Import games from Chess.com or send over the PGN/FEN to start
              analyzing <br />{" "}
            </p>
          </li>
          <li className="flex h-72 w-96 flex-col items-center gap-2 rounded-xl bg-slate-900 p-4 text-center text-emerald-50 shadow-sm">
            <h2 className="text-3xl font-medium tracking-tight">
              Chess Notebooks
            </h2>
            <p className="max-w-xs text-lg tracking-wide">
              Use notebooks to analyze a game! Each notebook will be unique to a
              game and private to each account. That way a notebook will always
              belong to you! <br />
              <span className="text-xs italic tracking-tighter">
                Notebook sharing and line analysis coming soon
              </span>
            </p>
          </li>
          <li className="flex h-72 w-96 flex-col items-center gap-2 rounded-xl bg-slate-900 p-4 text-center text-emerald-50 shadow-sm">
            <h2 className="text-3xl font-medium tracking-tight">
              Fully Functional Chessboard
            </h2>
            <p className="max-w-xs text-lg tracking-wide">
              Including a fully functional chessboard. No 3rd party software
              needed!
            </p>
          </li>
        </ul>
      </div>
      {/* CTA + Example notebook */}
      <div className="h-1/2 w-full lg:h-full">
        <div className="flex h-1/3 w-full flex-col items-center justify-center">
          {user.user?.publicMetadata.chessUsername ? (
            <Link href="/user">
              <button className="duration-400  min-w-fit rounded-lg bg-emerald-400 px-4 py-2 text-2xl font-medium tracking-tight text-emerald-950 transition hover:scale-105 hover:cursor-pointer">
                Sign In
              </button>
            </Link>
          ) : (
            <Link href="/user-sign-up">
              <button className="duration-400  min-w-fit rounded-lg bg-emerald-400 px-4 py-2 text-2xl font-medium tracking-tight text-emerald-950 transition hover:scale-105 hover:cursor-pointer">
                Start notating your games!
              </button>
            </Link>
          )}
        </div>
        <div className="h-1/2 w-full ">
          <div className="relative h-full w-full">
            <Image
              src={"/assets/svgs/studying.svg"}
              fill
              alt="Chess Studying"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
