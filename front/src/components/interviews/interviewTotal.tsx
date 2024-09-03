"use client";

import Image from "next/image";
import { UseMutateFunction } from "@tanstack/react-query";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

interface IProps {
  totalFeedBack: string;
  feedBackId: number;
  func: UseMutateFunction<void, Error, number, unknown>;
  twoFunc: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<void, Error>>;
  activeTwoFunc: boolean;
}

export const InterViewTotal = ({
  totalFeedBack,
  feedBackId,
  func,
  twoFunc,
  activeTwoFunc,
}: IProps) => {
  return (
    <section
      onClick={() => {
        if (activeTwoFunc) {
          twoFunc();
        } else {
          func(feedBackId);
        }
      }}
      id="feedback"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <Image
        className="inline rounded-full"
        src="/hamsterInterviewer.jpeg"
        alt="imgNotFound"
        width={50}
        height={50}
        sizes="(max-width: 1000px) 30vw, 60vw"
      />
      <h2 className="inline text-lg md:text-xl font-semibold text-gray-800">
        종합 피드백 {feedBackId + 1}
      </h2>
      <div className="mt-1 md:mt-2">
        <p className="text-gray-600">{totalFeedBack}</p>
      </div>
    </section>
  );
};
