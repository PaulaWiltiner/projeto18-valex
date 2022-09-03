import { Router } from "express";
import { purchaseInPOS } from "../controllers/purchaseController";

const purchaseRouter = Router();

purchaseRouter.put("/purchase", purchaseInPOS);

export default purchaseRouter;