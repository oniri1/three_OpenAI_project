import OpenAI from "openai";

export const main = async (openai: OpenAI) => {
  const completion = await openai.chat.completions.create({
    max_tokens: 2048,
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-4o-mini-2024-07-18",
  });

  console.log(completion.choices);
};
