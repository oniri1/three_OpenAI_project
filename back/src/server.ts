import app from "./app";
import { config } from "dotenv";
// import { fileUploaderToAI } from "./AI/AIApi";
// import path from "path";
import { main } from "./AI/AI";
import OpenAI from "openai";

config();

// const fileUpload = false;

const openAIModel = new OpenAI({
  apiKey: process.env.AIKEY,
  organization: process.env.ORGANI_ID,
  project: process.env.PROJECT_ID,
});

// if (fileUpload) {
//   console.log("파일 업로드");
//   const jsonPath = path.join(__dirname, "AI", "AIconfig.jsonl");
//   fileUploaderToAI({ openai: openAIModel, path: jsonPath });
// }

if (process.env.INTERVIEWER_AI_ID) {
  main({ openai: openAIModel, interviewerID: process.env.INTERVIEWER_AI_ID });
}

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
