"use client";

import { useMutation } from "@tanstack/react-query";
import { Dashboard } from "./dashBoard";
import { InterviewStart } from "./interviewStart";
import axios from "axios";
import { IsError } from "./isError";
import { IsPending } from "./isPend";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import env from "../envs";
import { IUser } from "@/funcs/interface/I_User";

const { serverUrl } = env;

export const MainPage = () => {
  const [name, setName] = useState<string>();
  const router = useRouter();

  const { data, isError, isPending, mutate } = useMutation({
    mutationKey: ["user", "check"],
    mutationFn: async () => {
      const { data, status }: { data: IUser; status: number } = await axios.get(
        `${serverUrl}/user/check`,
        {
          withCredentials: true,
        }
      );
      return { data: data, status: status };
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  //로그인 미확인 시
  useEffect(() => {
    if (data?.status === 204) {
      router.push("./userProFile");
    } else {
      setName(data?.data.name);
    }
  }, [data]);

  return isError ? (
    <IsError />
  ) : isPending ? (
    <IsPending />
  ) : data ? (
    <>
      <Dashboard name={name} />
      <InterviewStart />
    </>
  ) : (
    <IsError />
  );
};
