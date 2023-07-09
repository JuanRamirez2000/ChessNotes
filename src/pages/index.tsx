import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  Battery100Icon,
  CheckIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  const { data } = api.misc.grabLikeFeatures.useQuery();
  console.log(data);

  return (
    <>
      {/* Hero Section */}
      <div className="flex h-screen w-full flex-row bg-gradient-to-l from-sky-100 to-gray-50">
        <div className="flex h-full w-1/2 flex-col items-center justify-center">
          <div className="flex flex-col gap-2 text-slate-700">
            <h1 className="bg-clip-text text-7xl font-bold tracking-tighter text-slate-800">
              Chess Notes
            </h1>
            <p className="max-w-md text-xl">
              A batteries included app meant for you to step up your chess game
            </p>
            {user.user?.publicMetadata.chessUsername ? (
              <Link href="/user">
                <button className="duration-400 w-2/3 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-800 px-4 py-2 text-xl text-sky-100 transition hover:scale-105 hover:cursor-pointer hover:from-sky-600 hover:to-sky-950">
                  Sign In
                </button>
              </Link>
            ) : (
              <Link href="/user-sign-up" className="h-full w-full">
                <button className="duration-400 w-2/3 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-800 px-4 py-2 text-xl text-sky-100 transition hover:scale-105 hover:cursor-pointer hover:from-sky-600 hover:to-sky-950">
                  Start notating your games!
                </button>
              </Link>
            )}
            <ul className="text-xl">
              <li className="flex flex-row items-center gap-1">
                <CheckIcon className="h-6 w-6 text-sky-800" />
                <p>
                  Chess.com integration
                  <i className="font-thin">other platforms coming soon</i>
                </p>
              </li>
              <li className="flex flex-row items-center gap-1 ">
                <CheckIcon className="h-6 w-6 text-sky-800" />
                <p>Notebooks to store your analysis</p>
              </li>
              <li className="flex flex-row items-center gap-1 ">
                <CheckIcon className="h-6 w-6 text-sky-800" />
                <p>A complete and fully featured chessboard included</p>
              </li>
              <li className="flex flex-row items-center gap-1 ">
                <CheckIcon className="h-6 w-6 text-sky-800" />
                <p>With more features to come!</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="hero-image-clip relative flex h-full w-1/2 flex-col items-center justify-center overflow-hidden bg-[url('/assets/images/takingNotes.png')] bg-cover bg-left"></div>
      </div>
      {/* Main Features */}
      <div className="flex min-h-fit w-screen flex-col items-center bg-gradient-to-b from-sky-700 to-sky-800 text-slate-50">
        <h2 className="mt-16 text-5xl font-semibold tracking-tight">
          Our Current Features
        </h2>
        <div className="flex w-4/5 flex-row flex-nowrap justify-around">
          <div className="flex h-64 w-full max-w-md flex-col items-center justify-center rounded-lg text-center">
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <Battery100Icon className="h-12 w-12" />
              <h2 className="text-3xl font-semibold">Batteries Included</h2>
            </div>
            <p className="w-4/5 text-lg text-slate-200">
              Integrating a fully function chessboard with engine analysis on
              the way so you wont need to use a 3rd party application!
            </p>
          </div>
          <div className="flex h-64 w-full max-w-md flex-col items-center justify-center rounded-lg text-center">
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <PencilSquareIcon className="h-10 w-10" />
              <h2 className="text-3xl font-semibold">Chess Notebook</h2>
            </div>
            <p className="w-4/5 text-lg text-slate-200">
              Your one stop shop for you to see and take notes on your game!
              <i> with more features to come soon!</i>
            </p>
          </div>
          <div className="flex h-64 w-full max-w-md flex-col items-center justify-center rounded-lg text-center">
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <ArrowDownTrayIcon className="h-10 w-10" />
              <h2 className="text-3xl font-semibold">PGN / FEN Imoprt</h2>
            </div>
            <p className="w-4/5 text-lg text-slate-200">
              Got a PGN or FEN string? Just import it! We verify the string and
              create a notebook from it!
            </p>
          </div>
        </div>
      </div>
      {/* Upcoming Additions */}
      <div className="relative z-10 min-h-fit w-screen">
        <div className="background-wiggle absolute right-0 -z-10 h-72 w-1/4" />
        <div className="flex flex-col items-center gap-32">
          <div className="text-center">
            <h2 className="mt-24 text-4xl font-semibold tracking-tight text-slate-800">
              Some Upcoming Features To Get Excited For
            </h2>
            <p className="text-sm">
              <i>Liking shows more interest for the feature to be developed</i>
            </p>
          </div>
          <div className="flex h-72 w-1/2 flex-row justify-between">
            <ul className="flex flex-col gap-1 text-slate-700">
              <li className="flex flex-row items-center gap-1">
                <HeartIcon className="h-6 w-6 cursor-pointer text-sky-400 hover:text-rose-400" />
                <p className="text-xl">Specific Move Annotations</p>
              </li>
              <li className="flex flex-row items-center gap-1">
                <HeartIcon className="h-6 w-6 cursor-pointer text-sky-400 hover:text-rose-400" />
                <p className="text-xl">Line Analysis</p>
              </li>
              <li className="flex flex-row items-center gap-1">
                <HeartIcon className="h-6 w-6 cursor-pointer text-sky-400 hover:text-rose-400" />
                <p className="text-xl">Engine View</p>
              </li>
            </ul>
            <ul className="flex flex-col gap-1 text-slate-700">
              <li className="flex flex-row items-center gap-1">
                <HeartIcon className="h-6 w-6 cursor-pointer text-sky-400 hover:text-rose-400" />
                <p className="text-xl">
                  Graph View (for seeing all your noted lines)
                </p>
              </li>
              <li className="flex flex-row items-center gap-1">
                <HeartIcon className="h-6 w-6 cursor-pointer text-sky-400 hover:text-rose-400" />
                <p className="text-xl">Private Notes Sharing</p>
              </li>
              <li className="flex flex-row items-center gap-1">
                <HeartIcon className="h-6 w-6 cursor-pointer text-sky-400 hover:text-rose-400" />
                <p className="text-xl">Public Notebooks</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
