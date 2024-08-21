export const Interview = (): JSX.Element => {
  return (
    <section
      id="practice"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="inline text-lg md:text-xl font-semibold text-gray-800">
        <img
          src="/hamsterInterviewer.jpeg"
          alt="imgNotFound"
          className="h-[50px] w-[50px] inline rounded-full"
        ></img>
        햄스터 면접관
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <ul className="list-disc pl-5 space-y-2 mt-1">
            <li>
              <div className="text-blue-500 hover:underline">
                [1: 자기소개를 부탁드려요.]
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-md md:text-lg font-medium">당신의 대답은?</h3>
          <div className="mt-2 md:mt-4 p-4 border border-gray-300 rounded-lg">
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              placeholder="어떻게 대답해야 할까?"
            ></textarea>
            <button className="mt-2 md:mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto">
              답변하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
