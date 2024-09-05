import Link from "next/link";

interface IProps {
  name: string | undefined;
}

export const Dashboard = ({ name }: IProps): JSX.Element => {
  return (
    <section
      id="dashboard"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        햄스터의 가상 면접 사이트!
      </h2>
      <div className="mt-2 md:mt-4">
        <h3 className="text-md md:text-lg font-medium text-black">
          환영합니다! {name && `${name}님!`}
        </h3>
        <p className="text-gray-600">
          {name
            ? "무료로 가상 면접을 진행하고 피드백을 받아보세요!"
            : "간단한 가입 후 가상 면접을 진행해보세요!"}
        </p>
        {name ? (
          <></>
        ) : (
          <Link href={"/openAiProject/userProFile"}>
            <button className="mt-2 md:mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto">
              가입하기
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};
