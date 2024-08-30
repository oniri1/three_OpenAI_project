"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import env from "@/envs";
import axios from "axios";
import { IMsgs } from "@/funcs/interface/interViewAi";

const { serverUrl } = env;

interface IProps {
  serverValues: IMsgs[];
}

export const InterviewSaveBtn = ({ serverValues }: IProps): JSX.Element => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["ai", "feedBackSave"],
    mutationFn: async () => {
      await axios.post(
        `${serverUrl}/ai/feedBackSave`,
        { feedBacks: serverValues },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      router.replace("/feedBacks");
    },
    onError: (err) => {
      alert(err);
    },
  });

  return (
    <section
      id="practice"
      className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        당신의 면접에 대해 피드백을 받아보세요!
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {isPending ? (
          <div className="flex-1 text-black">잠시만 기다려주세요!</div>
        ) : (
          <div className="flex-1">
            <button
              onClick={async () => {
                try {
                  mutate();
                } catch (err) {
                  alert(err);
                }
              }}
              className="mt-2 md:mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto"
            >
              피드백 받기!
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
