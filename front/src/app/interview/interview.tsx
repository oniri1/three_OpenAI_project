"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InterviewHistory } from "@/components/interviews/interviewHistory";
import { getInterViewResult } from "@/funcs/APIs/interViewAi";
import { useMutation } from "@tanstack/react-query";
import { IMsgs } from "@/funcs/interface/interViewAi";
import { InterviewSaveBtn } from "@/components/interviews/interviewSaveBtn";

export const Interview = (): JSX.Element => {
  //
  const [historyValues, setHistoryValues] = useState<IMsgs[]>([]);

  const historys: JSX.Element[] | undefined = useMemo(() => {
    return historyValues?.map(({ ai, user }, idx) => {
      return <InterviewHistory key={idx} number={idx} ai={ai} user={user} />;
    });
  }, [historyValues]);
  //

  const [ai, setAiReq] = useState<string>();
  const [user, setUserRes] = useState<string>();

  const { data, isPending, mutate } = useMutation({
    mutationKey: ["post", "interViewAi"],
    mutationFn: async ({
      ai,
      user,
    }: {
      ai: string | undefined;
      user: string | undefined;
    }) => {
      return getInterViewResult({ ai: ai, user: user });
    },
    onSuccess: () => {
      if (ai && user) {
        setHistoryValues((values) => [...values, { ai: ai, user: user }]);
      }
      setUserRes(undefined);
    },
    onError: () => {},
  });

  useEffect(() => {
    if (data) setAiReq(data);
  }, [data, setAiReq]);

  useEffect(() => {
    mutate({ ai: ai, user: user });
  }, [mutate]);

  return (
    <>
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
              {isPending ? (
                <li>
                  <div className="text-blue-500 font-semibold">
                    질문 생성중...
                  </div>
                </li>
              ) : ai ? (
                data && (
                  <li>
                    <div className="text-blue-500 font-semibold">{ai}</div>
                  </li>
                )
              ) : (
                <li>
                  <div className="text-blue-500 font-semibold">
                    server Error
                  </div>
                </li>
              )}
            </ul>
          </div>
          {data && (
            <div className="flex-1">
              <h3 className="text-md md:text-lg font-medium">당신의 대답은?</h3>
              <div className="mt-2 md:mt-4 p-4 border border-gray-300 rounded-lg">
                <input
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                    setUserRes(target.value);
                  }}
                  onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (user) mutate({ ai: ai, user: user });
                    }
                  }}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-gray-800"
                  placeholder="어떻게 대답해야 할까?"
                ></input>
                <button
                  onClick={() => {
                    if (user) mutate({ ai: ai, user: user });
                  }}
                  className="mt-2 md:mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto"
                >
                  답변하기
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      {historys.length !== 0 && (
        <InterviewSaveBtn serverValues={historyValues} />
      )}
      {(!isPending || historys.length !== 0) && historys}
    </>
  );
};
