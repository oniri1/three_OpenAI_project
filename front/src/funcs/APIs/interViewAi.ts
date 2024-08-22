import axios from "axios";
import { IMsgs } from "../interFace/interViewAi";
import { serverUrl, AIUrl } from "../../envs";

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
