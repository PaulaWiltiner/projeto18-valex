import { Router } from "express";
import { activation, balanceAndTransactions, block, create, unlock } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", create);
cardRouter.put("/activation", activation);
cardRouter.get("/balanceAndTransactions",balanceAndTransactions);
cardRouter.put("/block",block);
cardRouter.put("/unlock",unlock);




export default cardRouter;