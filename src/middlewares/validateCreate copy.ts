
import { NextFunction, Request, Response } from "express";


export default async function validateCreate(req:Request, res:Response, next:NextFunction) {
  
  next();
}