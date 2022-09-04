import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService"


export async function purchaseInPOS(req: Request, res:Response){
  const {cardId, password,businessId,amount} : {cardId:number, password:string,businessId:number , amount:number } = req.body;
  await purchaseService.purchaseInPOS(cardId, password,businessId,amount)
  res.sendStatus(201)
}

