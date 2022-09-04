import { Router } from "express";
import { activation, balanceAndTransactions, block, create, unlock } from "../controllers/cardController";
import { validateSchema } from "../middlewares/schemaValidate";
import validateCreate from "../middlewares/validateCreate copy";
import passwordSchema from "../schemas/passwordSchema";

const cardRouter = Router();

cardRouter.post("/card", validateCreate, create);
cardRouter.put("/activation",validateSchema(passwordSchema) ,activation);
cardRouter.get("/balanceAndTransactions",balanceAndTransactions);
cardRouter.put("/block",block);
cardRouter.put("/unlock",unlock);




export default cardRouter;