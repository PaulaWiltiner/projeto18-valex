import { Router } from "express";
import { purchaseInPOS } from "../controllers/purchaseController";
import validateAmount from "../middlewares/validateAmount";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", validateAmount,purchaseInPOS);

export default purchaseRouter;