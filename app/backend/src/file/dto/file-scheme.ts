import * as Joi from 'joi';
export const createFileSchema = Joi.object({
    passport_id: Joi.number().integer().required(),
    name: Joi.string().max(300).required(),
    file_path: Joi.string().max(500).required(),
})

export const updateFileSchema = createFileSchema.fork(
    ['name', 'file_path', 'passport_id'], 
    (schema) => schema.optional()
);