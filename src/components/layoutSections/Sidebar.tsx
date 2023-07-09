import {
  PencilSquareIcon,
  PlusCircleIcon,
  PuzzlePieceIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="sticky left-0 top-0 h-full w-48 bg-gray-800">
      <h2 className="mt-4 w-full text-center text-2xl text-cyan-100">
        Chess Notes
      </h2>
      <ul className="mt-6 flex flex-col gap-1 text-lg font-medium tracking-tight text-cyan-100">
        <Link
          className={`flex flex-row gap-2 py-2 pl-4 hover:cursor-pointer hover:bg-cyan-800 hover:text-cyan-50 ${
            router.pathname === "/user" ? "border-r-8 border-cyan-700" : ""
          }`}
          href={"/user"}
        >
          <UserCircleIcon className="h-6 w-6 rounded-lg" />
          <li>Profile</li>
        </Link>
        <Link
          className={`flex flex-row gap-2 py-2 pl-4 hover:cursor-pointer hover:bg-cyan-800 hover:text-cyan-50 ${
            router.pathname === "/games" ? "border-r-8 border-cyan-700" : ""
          }`}
          href={"/games"}
        >
          <PuzzlePieceIcon className="h-6 w-6 rounded-lg" />
          <li>My games</li>
        </Link>
        <Link
          className={`flex flex-row gap-2 py-2 pl-4 hover:cursor-pointer hover:bg-cyan-800 hover:text-cyan-50 ${
            router.pathname === "/notes" ? "border-r-8 border-cyan-700" : ""
          }`}
          href={"/notes"}
        >
          <PencilSquareIcon className="h-6 w-6 rounded-lg" />
          <li>My Notes</li>
        </Link>
        <Link
          className={`flex flex-row gap-2 py-2 pl-4 hover:cursor-pointer hover:bg-cyan-800 hover:text-cyan-50 ${
            router.pathname === "/new-analysis"
              ? "border-r-8 border-cyan-700"
              : ""
          }`}
          href={"/new-analysis"}
        >
          <PlusCircleIcon className="h-6 w-6 rounded-lg" />
          <li>New Analysis</li>
        </Link>
      </ul>
    </div>
  );
}
