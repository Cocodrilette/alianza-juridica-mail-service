import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  HOST_API: Joi.string().default('http://localhost:5000/api/v1'),
  PORT: Joi.number().default(5000),
  NODE_ENV: Joi.string().default('dev'),
  API_KEY: Joi.string().default(null),
});
