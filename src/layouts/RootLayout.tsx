import Head from "next/head";
import Footer from "~/components/layoutSections/Footer";
import Navbar from "~/components/layoutSections/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Chess Notes</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen overflow-x-hidden bg-gray-50">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
