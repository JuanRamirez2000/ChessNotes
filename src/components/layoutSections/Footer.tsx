export default function Footer() {
  return (
    <div className="flex h-36 w-screen flex-row items-center justify-around bg-slate-700 text-slate-50">
      <div className="flex h-1/2 w-1/4 flex-col justify-center">
        <h2 className="text-4xl font-semibold tracking-tight">Chess Notes</h2>
      </div>
      <div className="flex h-1/2 w-1/4 flex-col justify-center">
        <div className="flex flex-row gap-2">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>FAQ</p>
          <p>Feedback</p>
          <p>Contact</p>
        </div>
      </div>
    </div>
  );
}
