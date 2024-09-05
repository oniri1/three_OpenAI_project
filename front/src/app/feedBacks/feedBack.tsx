"use client";

import { useEffect, useMemo, useState } from "react";
import { InterviewHistory } from "@/components/interviews/interviewHistory";
import { InterViewTotal } from "@/components/interviews/interviewTotal";
import { IFeedBackMsgs, ITotalValue } from "@/funcs/interface/interViewAi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import env from "@/envs";
import { IGetUserDatas } from "@/funcs/interface/I_User";

import { useRouter } from "next/navigation";

const { serverUrl } = env;

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

  const { data } = useQuery({
    queryKey: ["user", "check"],
    queryFn: async (): Promise<IGetUserDatas> => {
      try {
        const { data, status }: IGetUserDatas = await axios.get(
          `${serverUrl}/user/check`,
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
    if (data) {
      if (data?.status !== 200) {
        router.replace("/login");
      }
    }
  }, [data, router]);

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

        if (data && status === 200) {
          setTotalsValues(data);
          setIsShowHistory(false);
          setHistoryValues([]);
        }
        return data;
      } catch (err) {
        throw err;
      }
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

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
  }, [totalsValues, mutate, refetch, isShowHistory]);

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
