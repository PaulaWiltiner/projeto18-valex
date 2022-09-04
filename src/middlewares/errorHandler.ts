// for error handling
import { NextFunction, Request, Response } from "express";

export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  if (error.code === "NotFound") {
    return res.status(404).send(error.message);
  }
  if (error.code === "Unathorized") {
    return res.status(401).send(error.message);
  }
  if (error.code === "Conflict") {
    return res.status(409).send(error.message);
  }
  if (error.code === "UnprocessableEntity") {
    return res.status(422).send(error.message);
  }
  console.log(error)
  res.sendStatus(500);
}

// 401 - Unathorized
// 404 - Not Found
// 409 - Conflict
// 422 - Unprocessable Entity - erros semânicos
