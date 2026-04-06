import * as Joi from 'joi';

export const CreateEmployeeSchema = Joi.object({
    passport_data_id: Joi.number().integer().positive().required(),
    adress_data_id: Joi.number().integer().positive().required(),
    last_name: Joi.string().max(100).required(),
    first_name: Joi.string().max(100).required(),
    middle_name: Joi.string().max(100).optional(),
    birth_date: Joi.date().iso().required(),
});

export const UpdateEmployeeSchema = CreateEmployeeSchema.fork(
    ['passport_data_id', 'adress_data_id', 'last_name', 'first_name', 'birth_date'],
    (s) => s.optional()
);