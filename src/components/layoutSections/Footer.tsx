import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-fit min-h-fit w-full flex-col gap-4 bg-slate-900 p-4 lg:flex-row lg:justify-evenly">
      <div className="h-fit text-center lg:text-left">
        <h2 className="text-4xl font-medium tracking-tighter">Chess Notes</h2>
        <p className="mg:text-lg text-sm italic">
          An App by{" "}
          <Link
            href={"https://github.com/JuanRamirez2000"}
            className="underline decoration-emerald-400 decoration-2"
          >
            Juan Ramirez
          </Link>
        </p>
      </div>
      <div className="flex h-fit flex-col items-center justify-center ">
        <ul className="flex flex-col gap-6 text-lg  md:text-2xl lg:flex-row">
          <li>About</li>
          <li>FAQ</li>
          <li>Github</li>
        </ul>
      </div>
    </footer>
  );
}
