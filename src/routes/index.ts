import { Router } from "express";
import cardRouter from "./cardRouter";
import refillRouter from "./purchaseRouter";
import purchaseRouter from "./refillRouter";

const router = Router();
router.use(cardRouter);
router.use(purchaseRouter);
router.use(refillRouter);

export default router;