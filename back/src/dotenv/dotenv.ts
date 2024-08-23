import { config } from "dotenv";
config();

const env: { [key: string]: string | undefined } = {
  interViewAiId: process.env.INTERVIEWER_AI_ID,
  aiKey: process.env.AIKEY,
  orgId: process.env.ORGANI_ID,
  pjtId: process.env.PROJECT_ID,
  mysqlHost: process.env.MYSQL_HOST,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPWD: process.env.MYSQL_PASSWORD,
  mysqlDBName: process.env.MYSQL_DATABASE,
  mongodbPort: process.env.MONGODBPORT,
  mongodbName: process.env.MONGODBNAME,
};

export default env;

Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`${key} is ${value}`);
  }
});
