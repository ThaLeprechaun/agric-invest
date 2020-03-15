import { FarmDetails } from './../controllers/farms';
import { UserDetails } from './../controllers/users';
import joi from '@hapi/joi';
import { LogInUser } from '../routes/auth';

//Sanitize user input(Register)
export function registerValidate(data: UserDetails) {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim()
      .lowercase()
      .required(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow('')
      .required(),
    password: joi
      .string()
      .min(6)
      .max(50)
      .lowercase()
      .required(),
    userCategory: joi
      .string()
      .lowercase()
      .required(),
  });

  return schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
}

// Saintize updated user input
export function updateUserValidate(data: UserDetails) {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase(),
    lastName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase(),
    phone: joi
      .string()
      .pattern(/^(\+234[789][01]\d{8})$|^(0[789][01]\d{8})$/)
      .min(11)
      .max(14)
      .trim(),
    email: joi
      .string()
      .email()
      .lowercase()
      .allow(''),
  });

  return schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
}

export function validateFarm(data: FarmDetails) {
  const schema = joi.object({
    farmName: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    farmCategory: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    farmProduce: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    farmLocation: joi
      .string()
      .min(1)
      .max(255)
      .trim()
      .lowercase()
      .required(),
    unitPrice: joi.required(),
    produceRate: joi.required(),
    unitsAvailable: joi.required(),
  });

  return schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
}

export function logInUser(data: LogInUser) {
  const schema = joi.object({
    email: joi
      .string()
      .email()
      .lowercase()
      .allow('')
      .required(),
    password: joi
      .string()
      .min(6)
      .max(50)
      .lowercase()
      .required(),
  });

  return schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
}
