
import { NextFunction, Request, Response } from "express";

export default async function validateCreate(req:Request, res:Response, next:NextFunction) {
  
  const apiKey : string | undefined | string[] = req.header('x-api-key');
  const typeList = ['groceries', 'restaurant', 'transport', 'education', 'health']
  if(!apiKey){
    throw {code:'UnprocessableEntity' , message:'apiKey is missing'}
  }
  
  if(!typeList.includes(req.body.type)){
    throw {code:'UnprocessableEntity' , message:'the type is incorrect'}
  }

  next();
}