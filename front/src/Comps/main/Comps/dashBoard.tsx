export const Dashboard = (): JSX.Element => {
  return (
    <section
      id="dashboard"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        햄스터의 가상 면접 사이트!
      </h2>
      <div className="mt-2 md:mt-4">
        <h3 className="text-md md:text-lg font-medium">
          환영합니다, [유저 이름]
        </h3>
        <p className="text-gray-600">
          무료로 가상 면접을 진행하고 피드백을 받아보세요!
        </p>
      </div>
    </section>
  );
};
