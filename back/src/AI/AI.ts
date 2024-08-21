import OpenAI from "openai";

interface IMain {
  openai: OpenAI;
  interviewerID: string;
}

export const chatWithAI = async ({ openai, interviewerID }: IMain) => {
  const completion = await openai.chat.completions.create({
    max_tokens: 200,

    messages: [
      {
        role: "system",
        content:
          "당신은 면접관 역할을 맡고 있으며, 지원자에게 질문하고 그 답변을 평가합니다.",
      },
      { role: "assistant", content: "안녕하세요, 자기소개를 해주시겠어요?" },
      {
        role: "user",
        content: "팀과 협력하여 좋은 성과를 올린 경험이 있습니다.",
      },
    ],
    model: interviewerID,
  });

  console.log(completion.choices[0]);
};

//   const completion = await openai.chat.completions.create({
//     max_tokens: 300,
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-4o-mini-2024-07-18",
//   });

// console.log(completion.choices);
