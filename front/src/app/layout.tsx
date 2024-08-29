import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQuery } from "./reactQuery";
import { Header } from "./header";
import { Footer } from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI interviewer site",
  description: "oniri1 pers project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto p-4 md:p-6">
            <ReactQuery>{children}</ReactQuery>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
