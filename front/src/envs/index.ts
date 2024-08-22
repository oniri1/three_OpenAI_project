export const serverUrl = process.env.REACT_APP_SERVER_URL;
export const AIUrl = process.env.REACT_APP_AI_URL;

if (!serverUrl) {
  throw new Error("serverURL undefined");
}
if (!AIUrl) {
  throw new Error("AIURL undefined");
}
