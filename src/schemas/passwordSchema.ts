import joi from 'joi';

const passwordSchema = joi.object({
  password: joi.string().pattern(/[0-9]{4}/).required(),
  cardId: joi.number(),
  cvc: joi.string()
});

export default passwordSchema;