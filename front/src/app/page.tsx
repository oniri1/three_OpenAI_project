"use client";

import { MainPage } from "./mainpage";
import { Header } from "@/components/global/header";

const main = () => {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <MainPage />
      </main>
    </>
  );
};

export default main;
