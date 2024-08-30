"use client";

import { useEffect, useMemo, useState } from "react";
import { InterviewHistory } from "@/components/interviews/interviewHistory";
import { IFeedBackMsgs } from "@/funcs/interface/interViewAi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import env from "@/envs";
import { IGetUserFeedBacks } from "@/funcs/interface/I_User";
import { useRouter } from "next/navigation";

const { serverUrl } = env;

interface IGetUserFeedBackData {
  data: IGetUserFeedBacks;
  status: number;
}

export const FeedBack = (): JSX.Element => {
  const router = useRouter();
  const [historyValues, setHistoryValues] = useState<IFeedBackMsgs[]>();

  const historys: JSX.Element[] | undefined = useMemo(() => {
    return historyValues?.map(({ ai, user, feedBack }, idx) => (
      <InterviewHistory
        key={idx}
        number={idx}
        ai={ai}
        user={user}
        feedBack={feedBack}
      />
    ));
  }, [historyValues]);

  const { data } = useQuery({
    queryKey: ["user", "feedBacks"],
    queryFn: async (): Promise<IGetUserFeedBackData> => {
      try {
        const { data, status } = await axios.get(
          `${serverUrl}/user/feedBacks`,
          {
            withCredentials: true,
          }
        );
        return { data: data, status: status };
      } catch (err) {
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.status === 204) {
      router.replace("/userProFile");
    } else {
      setHistoryValues(data?.data.feedBacks);
    }
  }, [data, router, setHistoryValues]);

  return (
    <>
      <section
        id="feedback"
        className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
      >
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          피드백
        </h2>
        <div className="mt-1 md:mt-2">
          <h3 className="text-md md:text-lg font-medium text-gray-800">
            가장 최근 면접에 대한 피드백
          </h3>
          <p className="text-gray-600">{data?.data.totalFeedBack}</p>
        </div>
      </section>
      {historys}
    </>
  );
};
