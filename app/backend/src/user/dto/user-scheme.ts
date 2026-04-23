import * as Joi from 'joi';
import { UserRoles } from '../../../../enums/UserRoles';

export const CreateUserSchema = Joi.object({
  last_name: Joi.string().max(100).required(),
  first_name: Joi.string().max(100).required(),
  middle_name: Joi.string().max(100).allow(''),
  login: Joi.string().max(100).required(),
  password_hash: Joi.string().min(8).required(),
  role: Joi.string().valid(...Object.values(UserRoles)).required(),
});


export const UpdateUserSchema = Joi.object({
  login: Joi.string().max(100).optional(),
  password_hash: Joi.string().min(8).optional(),
  role: Joi.string().valid(...Object.values(UserRoles)).optional(),
});