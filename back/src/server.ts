import app from "./app";
import { config } from "dotenv";

import { chatWithAI } from "./AI/AI";
import OpenAI from "openai";
import routers from "./routers/index";

config();

// const openAIModel = new OpenAI({
//   apiKey: process.env.AIKEY,
//   organization: process.env.ORGANI_ID,
//   project: process.env.PROJECT_ID,
// });

// if (process.env.INTERVIEWER_AI_ID) {
//   chatWithAI({
//     openai: openAIModel,
//     interviewerID: process.env.INTERVIEWER_AI_ID,
//   });
// }

app.use(routers);

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
