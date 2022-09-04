import { Router } from "express";
import { refill } from "../controllers/refillController";
import validateAmount from "../middlewares/validateAmount";

const refillRouter = Router();

refillRouter.post("/refill", validateAmount, refill);

export default refillRouter;