
import { NextFunction, Request, Response } from "express";


export default async function validateAmount(req:Request, res:Response, next:NextFunction) {
  if(req.body.amount<=0){
    throw {code:'UnprocessableEntity' , message:'the value must be greater than zero'}
  }

  next();
}