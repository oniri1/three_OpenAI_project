import { IChatWithAI } from "../interface/I_AI";

import OpenAI from "openai";
import env from "../dotenv/dotenv";
const { interViewAiId, aiKey, orgId, pjtId } = env;

const openAIModel = new OpenAI({
  apiKey: aiKey,
  organization: orgId,
  project: pjtId,
});

export const chatWithInterViewerAI = async ({ messages }: IChatWithAI) => {
  if (interViewAiId) {
    console.log("AI 작동");
    const completion = await openAIModel.chat.completions.create({
      max_tokens: 1500,
      messages: messages,
      model: interViewAiId,
    });

    const result = completion.choices[0].message.content;
    console.log(result);
    return result;
  } else {
    throw new Error("interViewAiId missed");
  }
};
