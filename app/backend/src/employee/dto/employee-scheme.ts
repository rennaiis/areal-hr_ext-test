import * as Joi from 'joi';

export const CreateEmployeeSchema = Joi.object({
    last_name: Joi.string().max(100).required(),
    first_name: Joi.string().max(100).required(),
    middle_name: Joi.string().max(100).optional(),
    birth_date: Joi.date().iso().required(),
});

export const UpdateEmployeeSchema = CreateEmployeeSchema.fork(
    ['last_name', 'first_name', 'birth_date'],
    (s) => s.optional()
);