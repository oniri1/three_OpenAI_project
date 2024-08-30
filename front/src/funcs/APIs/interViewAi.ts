import axios from "axios";
import { IMsgs } from "../interface/interViewAi";
import env from "@/envs";

const { serverUrl, AIUrl } = env;

export const getInterViewResult = async ({ ai, user }: IMsgs) => {
  const { data }: { data: { msg: string } } = await axios.post(
    `${serverUrl}/${AIUrl}/doInterView`,
    { ai: ai, user: user },
    {
      withCredentials: true,
    }
  );

  return data.msg;
};
