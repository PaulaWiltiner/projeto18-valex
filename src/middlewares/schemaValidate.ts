// for schema validation
import { NextFunction, Request, Response } from "express";

export function validateSchema(schema:any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw {
        code: "UnprocessableEntity",
        massage: error.details.map((detail:any) =>
          detail.message.replace(/[\\"()]/g, "")
        ),
      };
    }

    next();
  };
}