import { Request, Response } from "express";
import * as refillService from "../services/refillService"


export async function refill(req: Request, res:Response){
  const {cardId, amount} : {cardId:number , amount:number } = req.body;
  await refillService.refill(cardId,amount)
  res.sendStatus(201)
}
