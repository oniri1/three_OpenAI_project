"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import env from "@/envs";
import axios from "axios";
import { IGetUserDatas, IUser } from "@/funcs/interface/I_User";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

const { serverUrl } = env;

export const UserProFile = (): JSX.Element => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [text, setText] = useState<string>();
  const [pw, setPw] = useState<string>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textHandleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    [setText]
  );

  const nameHandleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const emailHandleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const pwHandleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPw(event.target.value);
    },
    [setPw]
  );

  const { mutate } = useMutation({
    mutationKey: ["user", "update"],
    mutationFn: async () => {
      await axios.patch(
        `${serverUrl}/user/update`,
        {
          name: name,
          email: email,
          intro: text,
          pw: pw,
        },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (err) => {
      alert(err);
    },
  });

  // 텍스트가 변경될 때마다 높이를 자동으로 조정
  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 콘텐츠에 맞게 높이 조정
    }
  }, [text, textareaRef]);

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
      console.log(data.status);
      if (data.status === 200) {
        const { name, email, intro, pw } = data?.data as IUser;

        setName(name);
        setEmail(email);
        setText(intro);
        setPw(pw);
      } else {
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, [data, setName, setEmail, setText, setPw, router]);

  return (
    <section
      id="profile"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 animate-slide-up"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        Profile
      </h2>
      <div className="mt-2 md:mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name:
          </label>
          <input
            onChange={nameHandleChange}
            maxLength={15}
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            placeholder="hamster"
            value={name ? name : ""}
          />
          <span className="text-gray-400">{name ? name.length : 0}/15</span>
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email:
          </label>
          <input
            onChange={emailHandleChange}
            maxLength={100}
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            placeholder="hamster.ham.com"
            value={email ? email : ""}
          />
          <span className="text-gray-400">{email ? email.length : 0}/100</span>
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            PassWord:
          </label>
          <input
            onChange={pwHandleChange}
            maxLength={100}
            type="text"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-600"
            placeholder="비밀번호 변경시 입력"
            autoComplete="current-password"
            value={pw ? pw : ""}
          />
          <span className="text-gray-400">{pw ? pw.length : 0}/100</span>
        </div>
        <div>
          <label htmlFor="resume" className="block text-gray-700 font-medium">
            자신의 소개를 간단하게 적어보세요.
          </label>
          <textarea
            ref={textareaRef}
            onChange={textHandleChange}
            id="resume"
            maxLength={500}
            className="w-[100%] border-[1.5px] border-gray-300 rounded-lg text-gray-600 overflow-hidden resize-none"
            value={text ? text : ""}
          />
          <span className="text-gray-400">{text ? text.length : 0}/500</span>
        </div>
        <button
          onClick={async () => {
            try {
              if (name && email && text) {
                mutate();
              } else {
                throw "내용을 제대로 입력하세요";
              }
            } catch (err) {
              alert(err);
            }
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          {data && data.status === 200 ? "프로필 업데이트" : "회원 가입"}
        </button>
      </div>
    </section>
  );
};
