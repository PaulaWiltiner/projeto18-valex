// for schema validation
import { NextFunction, Request, Response } from "express";

export function validateSchema(schema:any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const list: string[]=error.details.map((detail:any) =>
      detail.message.replace(/[\\"()]/g, ""));
  
      throw {
        code: "UnprocessableEntity",
        message: list[0]
      };
    }

    next();
  };
}