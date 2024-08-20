import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.set("port", process.env.PORT || 3003);
app.use(cors());
app.use(express.json());

export default app;
