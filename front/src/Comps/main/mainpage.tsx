import { useMutation } from "@tanstack/react-query";
import { Dashboard, InterviewStart } from "./";
import axios from "axios";
import { IsPending, IsError } from "../pending";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import env from "../../envs";
import { IUser } from "../../interface/I_User";

const { serverUrl } = env;

export const MainPage = () => {
  const navigate = useNavigate();

  const { data, isError, isPending, mutate } = useMutation({
    mutationKey: ["user", "check"],
    mutationFn: async () => {
      const { data, status }: { data: IUser; status: number } = await axios.get(
        `${serverUrl}/User/Check`,
        {
          withCredentials: true,
        }
      );
      return { user: data, status: status };
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  //로그인 미확인 시
  useEffect(() => {
    if (data?.status === 204) {
      navigate("./userProFile");
    }
  }, [data]);

  return isError ? (
    <IsError />
  ) : isPending ? (
    <IsPending />
  ) : data ? (
    <>
      <Dashboard />
      <InterviewStart />
    </>
  ) : (
    <IsError />
  );
};
