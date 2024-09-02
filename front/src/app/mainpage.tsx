"use client";

import { useMutation } from "@tanstack/react-query";
import { Dashboard } from "@/components/global/dashBoard";
import { InterviewStart } from "@/components/interviews/interviewStart";
import axios from "axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import env from "../envs";
import { IUser } from "@/funcs/interface/I_User";

const { serverUrl } = env;

export const MainPage = () => {
  const [name, setName] = useState<string>();
  const router = useRouter();

  const { data, mutate } = useMutation({
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
    if (data) {
      setName(data?.data.name);
    }
  }, [data, setName]);

  return (
    <div className="animate-slide-up">
      <Dashboard name={name} />
      {name && <InterviewStart />}
    </div>
  );
};
