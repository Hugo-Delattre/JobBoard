import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import { Html, Head } from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobBoard",
  description: "JobBoard project from Hugo Dufor and Hugo Delattre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {/* <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=Montserrat:wght@700&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <body className={inter.className}>
        <NavBar />
        <div className="px-16 md:px-32 lg:px-64">{children}</div>
      </body>
    </html>
  );
}
