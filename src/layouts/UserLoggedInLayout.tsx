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
      <div className="h-full w-screen flex-1 grow bg-cyan-400">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
