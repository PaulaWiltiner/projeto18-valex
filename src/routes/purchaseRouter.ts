import { Router } from "express";
import { refill } from "../controllers/refillController";

const refillRouter = Router();

refillRouter.put("/refill", refill);

export default refillRouter;