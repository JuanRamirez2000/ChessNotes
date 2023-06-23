import { type NextPage } from "next";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUser();
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-screen bg-gradient-to-br from-cyan-300 to-transparent to-50% ">
        <div className="h-full w-full">
          <div className="absolute inset-0">
            <Image
              src={"/assets/images/chessHeroBackground.jpg"}
              alt="Hero Background"
              fill
            />
          </div>
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <h1 className="p-6 text-5xl font-semibold">Chess Notes</h1>
            <p className="text-2xl font-medium">
              An app to help you study chess
            </p>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="flex h-screen w-screen flex-col items-center ">
        <ul className="h-full w-full">
          <li className="flex h-1/3 w-full flex-row p-4">
            <div className="flex h-full w-1/2 flex-col items-center justify-center">
              <h3 className="p-4 text-3xl">Take notes on your games</h3>
              <p className="text-md w-1/2 text-center">
                Whether its a quick note on a critical move, annotating where
                you had possible tactics, or a full notebook on every
                possibility.
              </p>
            </div>
          </li>
          <li className="flex h-1/3 w-full flex-row justify-between bg-gray-700 p-4">
            <div className="relative h-full w-1/2">
              <Image
                src={"/assets/svgs/linesGraphView.svg"}
                alt="Line Analysis"
                fill
              />
            </div>
            <div className="flex h-full w-1/2 flex-col items-center justify-center text-gray-50">
              <h3 className="p-4 text-3xl">Study Specific lines</h3>
              <p className="text-md w-1/2 text-center">
                With a graph view to help you navigate through all the ideas
                between every move!
              </p>
            </div>
          </li>
          <li className="h-1/3 w-full p-4">
            <div className="flex h-full w-1/2 flex-col items-center justify-center">
              <h3 className="p-4 text-3xl">Share notes with others</h3>
              <p className="text-md w-1/2 text-center">
                Whether it is your chess coach or the community!
              </p>
              <p className="text-xs italic">
                Community and master notebooks coming eventually...
              </p>
            </div>
          </li>
        </ul>
      </div>
      {/* Get Started section */}
      <div>
        {user.user?.publicMetadata.chessUsername ? (
          <>
            <Link
              className="rounded-lg bg-emerald-400 px-4 py-2 font-bold"
              href="/user"
            >
              SignIn
            </Link>
            <UserButton />
          </>
        ) : (
          <Link href="/user-sign-up">SignUp</Link>
        )}
      </div>
    </>
  );
};

export default Home;
