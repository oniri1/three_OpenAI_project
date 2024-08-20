import app from "./app";
import { config } from "dotenv";
import { main } from "./AI/AI";
import OpenAI from "openai";

config();

const openAIModel = new OpenAI({
  apiKey: process.env.AIKEY,
  organization: process.env.ORGANI_ID,
  project: process.env.PROJECT_ID,
});

main(openAIModel);

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
