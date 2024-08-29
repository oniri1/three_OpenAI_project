export const InterviewHistory = (): JSX.Element => {
  return (
    <section
      id="feedbacks"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        질문 사항 [1]
      </h2>
      <div className="mt-2 md:mt-4">
        <h3 className="text-md md:text-lg font-medium">[질문 내용]</h3>
        <h3 className="text-md md:text-lg font-medium">[유저 답변]</h3>
        <p className="text-gray-600">[유저 답변에 대한 피드백]</p>
      </div>
    </section>
  );
};
