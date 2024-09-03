"use client";

import { useCallback, useMemo, useState } from "react";
import { InterviewHistory } from "@/components/interviews/interviewHistory";
import { InterViewTotal } from "@/components/interviews/interviewTotal";
import { IFeedBackMsgs, ITotalValue } from "@/funcs/interface/interViewAi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import env from "@/envs";

import { useRouter } from "next/navigation";

const { serverUrl } = env;

// interface IGetUserFeedBackData {
//   data: IGetUserFeedBacks;
//   status: number;
// }

export const FeedBack = (): JSX.Element => {
  const router = useRouter();
  const [totalsValues, setTotalsValues] = useState<ITotalValue[]>([]);
  const [historyValues, setHistoryValues] = useState<IFeedBackMsgs[]>([]);

  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["user", "feedback"],
    mutationFn: async (id: number) => {
      try {
        const result = await axios.post(
          `${serverUrl}/user/feedBack`,
          {
            feedBackId: id,
          },
          { withCredentials: true }
        );

        setTotalsValues((totals) => {
          return totals.filter(({ feedBackId }) => {
            return feedBackId === id;
          });
        });

        const historyResult: IFeedBackMsgs[] = result.data;

        setHistoryValues(historyResult);
        setIsShowHistory(true);
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { refetch } = useQuery({
    queryKey: ["user", "feedBacks"],
    queryFn: async (): Promise<void> => {
      try {
        const { data, status } = await axios.get(
          `${serverUrl}/user/feedBacks`,
          {
            withCredentials: true,
          }
        );

        if (status === 204) {
          router.replace("/userProFile");
        } else if (data) {
          setTotalsValues(data);
          setIsShowHistory(false);
          setHistoryValues([]);
        } else {
          alert("err");
          router.replace("/");
        }
        return data;
      } catch (err) {
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  const totals: JSX.Element[] | undefined = useMemo(() => {
    return totalsValues?.map(({ feedBackId, totalFeedBack }) => (
      <InterViewTotal
        key={feedBackId}
        totalFeedBack={totalFeedBack}
        feedBackId={feedBackId}
        func={mutate}
        activeTwoFunc={isShowHistory}
        twoFunc={refetch}
      ></InterViewTotal>
    ));
  }, [totalsValues, mutate]);

  const historys: JSX.Element[] | undefined = useMemo(() => {
    return historyValues.map(({ ai, user, feedBack }, idx) => (
      <InterviewHistory
        key={idx}
        number={idx}
        ai={ai}
        user={user}
        feedBack={feedBack}
      />
    ));
  }, [historyValues]);

  return (
    <>
      {totals}
      {historys}
    </>
  );
};
