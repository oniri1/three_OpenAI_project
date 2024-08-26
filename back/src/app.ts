import express, { Express } from "express";
import routers from "./routers/index";
import cors from "cors";
import morgan from "morgan";
import filest from "session-file-store";
import session from "express-session";
import env from "./dotenv/dotenv";

declare module "express-session" {
  export interface SessionData {
    userData?: any;
  }
}

const { sessionKey } = env;
const FileStore = filest(session);

const app: Express = express();

app.set("port", process.env.PORT || 3005);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
if (sessionKey) {
  app.use(
    session({
      secret: sessionKey,
      resave: false,
      saveUninitialized: true,
      name: "userData",
      store: new FileStore({
        reapInterval: 10, //만료된 세션을 10초 주기로 삭제한다.
        path: "./session",
      }),
      cookie: {
        maxAge: 1000 * 60,
      },
    })
  );
} else {
  throw new Error("sessionKey Is undefined");
}

app.use(routers);

export default app;
