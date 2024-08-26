export const IsPending = (): JSX.Element => {
  return (
    <div className="flex flex-wrap h-[30%] w-[30%]">
      <img
        src="/hamsterworking.jpeg"
        alt="imgNotFound"
        className="h-[100%] w-[100%] rounded-full"
      ></img>
      <div className="w-[100%]">
        <div className="flex justify-center items-center">
          데이터를 가져오고 있어요.
        </div>
      </div>
    </div>
  );
};
