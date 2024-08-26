import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";

export interface IChatWithAI {
  messages: ChatCompletionMessageParam[];
}
