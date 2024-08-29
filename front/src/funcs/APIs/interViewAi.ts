import axios from "axios";
import { IMsgs } from "../interface/interViewAi";
import env from "@/envs";

const { serverUrl, AIUrl } = env;

export const getInterViewResult = async ({ ai, user }: IMsgs) => {
  console.log("서버에 요청 보냄", "ai : ", ai, "user : ", user);
  const { data }: { data: { msg: string } } = await axios.post(
    `${serverUrl}/${AIUrl}/doInterView`,
    { ai: ai, user: user },
    {
      withCredentials: true,
    }
  );

  console.log(data);

  return data.msg;
};
