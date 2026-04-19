import * as Joi from 'joi'
export const CreateDepartmentScheme = Joi.object({
    organization_id: Joi.number().integer().positive().required(),
    parent_department_id: Joi.number().integer().positive().optional(),
    name: Joi.string().max(150).required(),
    comment: Joi.string().max(1000).optional()
})

 Joi.object({
    name: Joi.string().max(150).optional(),
    comment: Joi.string().max(1000).optional()
})