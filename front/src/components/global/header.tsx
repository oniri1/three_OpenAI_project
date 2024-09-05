"use client";

import axios from "axios";
import Link from "next/link";
import env from "@/envs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "@/funcs/interface/I_User";

const { serverUrl } = env;

export const Header = (): JSX.Element => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const reloadHandler = useCallback(() => {
    router.replace("/logouting");
  }, [router]);

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

  useEffect(() => {
    if (data?.status === 200) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [data]);

  return (
    <header className="bg-white shadow-md border-b border-blue-500">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-xl md:text-2xl font-bold text-blue-900">
            가상 면접 사이트
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-2 md:space-x-4">
            <li>
              <Link href={"/"}>
                <div className="text-blue-500 hover:underline cursor-pointer">
                  메인 페이지
                </div>
              </Link>
            </li>
            <li>
              <Link href={"/feedBacks"}>
                <div className="text-blue-500 hover:underline cursor-pointer">
                  피드백
                </div>
              </Link>
            </li>
            <li>
              <Link href={"/userProFile"}>
                <div className="text-blue-500 hover:underline cursor-pointer">
                  유저 프로필
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        {isLogin ? (
          <div
            onClick={async () => {
              try {
                const result = await axios.get(`${serverUrl}/user/logout`, {
                  withCredentials: true,
                });

                if (result.status === 200) {
                  reloadHandler();
                }
              } catch (err) {
                console.error(err);
              }
            }}
            className="text-xl md:text-xl font-bold text-blue-600 cursor-pointer hover:scale-105"
          >
            로그아웃
          </div>
        ) : (
          <div
            onClick={() => {
              router.replace("/login");
            }}
            className="text-xl md:text-xl font-bold text-blue-600 cursor-pointer hover:scale-105"
          >
            로그인
          </div>
        )}
      </div>
    </header>
  );
};
