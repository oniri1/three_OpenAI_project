import { Router, Request, Response } from "express";
const router = Router();

const result: string[] = [];

router.get("/api", (req: Request, res: Response) => {
  console.log("geted");
  res.json(result);
});

router.post("/api", (req: Request, res: Response) => {
  console.log("posted");
  result.push("dumi");
  res.json("ok Posted");
});

export default router;
