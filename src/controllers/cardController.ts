import { Request, Response } from "express";
import * as cardService from "../services/cardService"

export async function create(req: Request, res:Response){

  const apiKey : string | undefined | string[] = req.header('x-api-key');
  const data =req.body;
  await cardService.create(apiKey,data)
  res.sendStatus(201)
}

export async function activation(req: Request, res:Response){
  const {cardId, cvc, password} : {cardId:number, cvc:string, password:string} = req.body;
  await cardService.activation(cardId,cvc,password)
  res.sendStatus(200)
}

export async function balanceAndTransactions(req: Request, res:Response){
  const {cardId} : {cardId:number} = req.body;
  const result = await cardService.balanceAndTransactions(cardId);
  res.send(result).status(201)
}

export async function block(req: Request, res:Response){
  const {cardId,password} : {cardId:number,password:string} = req.body;
  await cardService.block(cardId,password)
  res.sendStatus(200)
}

export async function unlock(req: Request, res:Response){
  const {cardId,password} : {cardId:number,password:string} = req.body;
  await cardService.unlock(cardId,password)
  res.sendStatus(200)
}


