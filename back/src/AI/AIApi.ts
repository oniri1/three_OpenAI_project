import fs from "fs";
import OpenAI from "openai";

interface IFileUploaderToAI {
  openai: OpenAI;
  path: string;
}

export const fileUploaderToAI = async ({ openai, path }: IFileUploaderToAI) => {
  try {
    await openai.files.create({
      file: fs.createReadStream(path),
      purpose: "fine-tune",
    });
  } catch (err) {
    console.log(err);
  }
};
