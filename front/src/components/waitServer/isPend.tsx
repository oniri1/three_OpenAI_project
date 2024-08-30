import Image from "next/image";

export const IsPending = (): JSX.Element => {
  return (
    <div className="flex flex-wrap h-[100%] w-[100%] justify-center items-center">
      <div className="relative h-[250px] w-[250px] flex">
        <Image
          className="rounded-full"
          src="/hamsterworking.jpeg"
          alt="imgNotFound"
          fill
          sizes="(max-width: 1000px) 30vw, 60vw"
          priority
        />
      </div>

      <div className="w-[100%]">
        <div className="flex justify-center items-center text-black">
          서버를 기다리고 있어요.
        </div>
      </div>
    </div>
  );
};
