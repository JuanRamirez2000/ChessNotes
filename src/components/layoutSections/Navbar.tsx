import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const user = useUser();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 flex h-14 w-screen flex-row items-center justify-around bg-slate-800 text-slate-100">
      <h1 className="w-1/2 text-2xl font-semibold">Chess Notes</h1>
      {user.isSignedIn ? (
        <div className="w-fit">
          <ul className="flex flex-row justify-center gap-6 text-lg">
            <Link
              className={`duration-400 relative rounded-lg bg-sky-500 px-5 py-1.5 text-base transition hover:scale-105 hover:cursor-pointer hover:bg-sky-400 hover:text-sky-50 ${
                router.pathname === "/user" ? "bg-sky-400 text-sky-50" : ""
              }`}
              href={"/user"}
            >
              {router.pathname === "/user" && (
                <>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 rounded-full bg-emerald-400"></span>
                </>
              )}
              <li>Profile</li>
            </Link>
            <Link
              className={`duration-400 relative rounded-lg bg-sky-500 px-5 py-1.5 text-base transition hover:scale-105 hover:cursor-pointer hover:bg-sky-400 hover:text-sky-50 ${
                router.pathname === "/games" ? "bg-sky-400 text-sky-50" : ""
              }`}
              href={"/games"}
            >
              {router.pathname === "/games" && (
                <>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 rounded-full bg-emerald-400"></span>
                </>
              )}
              <li>My games</li>
            </Link>
            <Link
              className={`duration-400 relative rounded-lg bg-sky-500 px-5 py-1.5 text-base transition hover:scale-105 hover:cursor-pointer hover:bg-sky-400 hover:text-sky-50 ${
                router.pathname === "/notes"
                  ? "rounded-lg bg-sky-400 text-sky-50"
                  : ""
              }`}
              href={"/notes"}
            >
              {router.pathname === "/notes" && (
                <>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 rounded-full bg-emerald-400"></span>
                </>
              )}
              <li>My Notes</li>
            </Link>
            <Link
              className={`duration-400 relative rounded-lg bg-sky-500 px-5 py-1.5 text-base transition hover:scale-105 hover:cursor-pointer hover:bg-sky-400 hover:text-sky-50 ${
                router.pathname === "/new-analysis"
                  ? "bg-sky-400 text-sky-50"
                  : ""
              }`}
              href={"/new-analysis"}
            >
              {router.pathname === "/new-analysis" && (
                <>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="absolute right-0 top-0 -mt-1 h-3 w-3 rounded-full bg-emerald-400"></span>
                </>
              )}
              <li>New Analysis</li>
            </Link>
          </ul>
        </div>
      ) : (
        <div className="w-fit">
          <Link href="/user-sign-up" className="h-full w-full">
            <button className="duration-400 w-fit rounded-lg bg-sky-500 px-5 py-1.5 text-base transition hover:scale-105 hover:cursor-pointer hover:bg-sky-400 hover:text-sky-50">
              Sign Up!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
