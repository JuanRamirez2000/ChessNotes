import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screeen flex w-full flex-col items-center justify-center">
      <SignUp />
    </div>
  );
}
