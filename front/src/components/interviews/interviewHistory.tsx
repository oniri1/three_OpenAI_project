interface IProps {
  number: number;
  ai?: string;
  user?: string;
  feedBack?: string;
}

export const InterviewHistory = ({
  number,
  ai,
  user,
  feedBack,
}: IProps): JSX.Element => {
  return (
    <section
      id="feedbacks"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 animate-slide-up"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        질문 .{number + 1}
      </h2>
      <div className="mt-2 md:mt-4">
        {feedBack && (
          <p className="text-md md:text-lg font-semibold text-red-500">
            피드백 : {feedBack}
          </p>
        )}
        <h3 className="text-md md:text-lg font-semibold text-blue-700">
          질문 내용 : {ai}
        </h3>
        <h3 className="text-md md:text-lg font-semibold text-black">
          사용자 답변 : {user}
        </h3>
      </div>
    </section>
  );
};
