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
      <Navbar />
      <div className="flex h-full w-full flex-row bg-cyan-400">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
