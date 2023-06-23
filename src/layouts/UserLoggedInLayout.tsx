import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

export default function UserLoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full w-full flex-row overflow-scroll overflow-x-hidden ">
        <Sidebar />
        <main className="h-full w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
