import { Router, Request, Response } from "express";
// import User from "../DB/MySQL/config/tables/User";

const router = Router();

router.get("/check", async (req: Request, res: Response) => {
  try {
    if (req.session.userData) {
      //체크 해야함
    } else {
      console.log("세션없음");
      res.status(204).send();
    }
  } catch (err) {
    res.status(403).json(err);
  }
});

export default router;
