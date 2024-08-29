export const IsError = (): JSX.Element => {
  return (
    <div className="flex flex-wrap h-[30%] w-[30%]">
      <img
        src="/hamsterError.jpeg"
        alt="imgNotFound"
        className="h-[100%] w-[100%] rounded-full"
      ></img>
      <div className="w-[100%]">
        <div className="flex justify-center items-center text-black">
          서버를 기다리고 있어요.
        </div>
      </div>
    </div>
  );
};
