import Link from "next/link";

export const InterviewStart = (): JSX.Element => {
  return (
    <section
      id="practice"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        면접 시작!
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <h3 className="text-md md:text-lg font-medium text-black">
            지금 면접을 시작해보세요!
          </h3>
          <Link href={"/interview"}>
            <button className="mt-2 md:mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto">
              시작하기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
