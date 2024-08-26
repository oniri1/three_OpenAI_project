import { Router, Request, Response } from "express";
import ai from "./AIRouter";
import user from "./UserRouter";

const router = Router();

router.use("/ai", ai);
router.use("/user", user);

export default router;
