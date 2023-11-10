import * as Joi from 'joi';

export const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().required(),
  PORT: Joi.number().default(3000).required(),
  MONGO_URL: Joi.string().required(),
});
