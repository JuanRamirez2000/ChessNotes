import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
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
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
