"use client";

import { useMemo, useState } from "react";
import { InterviewHistory } from "./interviewHistory";

export const FeedBack = (): JSX.Element => {
  const [historyValues, setHistoryValues] = useState<[]>();

  const historys: JSX.Element[] | undefined = useMemo(() => {
    return historyValues?.map((history) => <InterviewHistory />);
  }, []);

  return (
    <section
      id="feedback"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">피드백</h2>
      <div className="mt-2 md:mt-4">
        <h3 className="text-md md:text-lg font-medium">
          가장 최근 [유저 이름]에 대한 피드백
        </h3>
        <p className="text-gray-600">
          당신의 대답은 질문에 대해 명확한 답변을 내지 못했습니다.
        </p>
        <div className="mt-2 md:mt-4">
          <h4 className="text-sm md:text-md font-medium text-gray-800">
            긍정적인 답변
          </h4>
          <div className="w-full bg-green-200 rounded-full h-4 md:h-6">
            <div
              className="bg-green-500 text-white text-center text-xs md:text-xs font-medium h-full rounded-full"
              style={{ width: "70%" }}
            >
              70%
            </div>
          </div>
          <h4 className="mt-2 md:mt-4 text-sm md:text-md font-medium text-gray-800">
            부정적인 답변
          </h4>
          <div className="w-full bg-red-200 rounded-full h-4 md:h-6">
            <div
              className="bg-red-500 text-white text-center text-xs md:text-xs font-medium h-full rounded-full"
              style={{ width: "30%" }}
            >
              30%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
