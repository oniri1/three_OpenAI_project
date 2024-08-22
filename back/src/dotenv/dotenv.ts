import { config } from "dotenv";
config();

export const interViewAiId: string | undefined = process.env.INTERVIEWER_AI_ID;

export const aiKey: string | undefined = process.env.AIKEY;
export const orgId: string | undefined = process.env.ORGANI_ID;
export const pjtId: string | undefined = process.env.PROJECT_ID;

if (interViewAiId === undefined) {
  throw new Error("InterViewAiID undefined");
}
if (aiKey === undefined) {
  throw new Error("AiKey undefined");
}
if (orgId === undefined) {
  throw new Error("OrgId undefined");
}
if (pjtId === undefined) {
  throw new Error("PjtId undefined");
}
