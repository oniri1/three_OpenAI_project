import { Router, Request, Response } from "express";
import { chatWithInterViewerAI } from "../AI/AI";
import { ChatCompletionMessageParam } from "openai/resources/index";

const interViewMSGDefault: ChatCompletionMessageParam = {
  role: "system",
  content:
    "당신은 면접관 역할을 맡고 있으며, 지원자에게 질문하고 그 답변을 평가합니다.",
};

const router = Router();

router.post("/doInterView", async (req: Request, res: Response) => {
  try {
    const interViewMsg: ChatCompletionMessageParam[] = [interViewMSGDefault];

    if (req.body.ai && req.body.user) {
      console.log(req.body, "ai랑 user의 데이터를 받았다.");

      const ai: string = req.body.ai;
      const user: string = req.body.user;

      const aiMsg: ChatCompletionMessageParam = {
        role: "assistant",
        content: ai,
      };

      const userMsg: ChatCompletionMessageParam = {
        role: "user",
        content: user,
      };

      interViewMsg.push(aiMsg);
      interViewMsg.push(userMsg);

      console.log("유저 데이터 변환 성공", interViewMsg);
    }
    console.log("작동 시작");
    const result = await chatWithInterViewerAI({ messages: interViewMsg });
    res.status(200).json({ msg: result });
  } catch (err) {
    res.status(403).json(err);
  }
});

router.post("/feedBack", async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(403).json(err);
  }
});

export default router;
