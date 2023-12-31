import "./globals.scss";
import type { Metadata } from "next";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
// import { Html, Head } from "next/head";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
        <div id="modals"></div>
        {/* <CacheProvider> */}
        {/* <ChakraProvider> */}
        <NavBar />
        <div className="px-4 mx-auto md:px-6 lg:px-8 max-w-7xl">{children}</div>
        {/* </ChakraProvider> */}
        {/* </CacheProvider> */}
      </body>
    </html>
  );
}
