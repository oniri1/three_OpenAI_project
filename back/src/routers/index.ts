import { Router, Request, Response } from "express";
import AI from "./AIRouter";
const router = Router();

router.use("/AI", AI);

export default router;
