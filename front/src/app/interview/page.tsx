import { Header } from "@/components/global/header";
import { Interview } from "./interview";

const main = () => {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Interview />
      </main>
    </>
  );
};

export default main;
