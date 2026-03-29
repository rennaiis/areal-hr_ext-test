import * as Joi from 'joi'

export const CreateOrganisationScheme = Joi.object({
    name: Joi.string().max(300).required(),
    comment: Joi.string().max(1000).optional()
})

export const UpdateOrganisationScheme = Joi.object({
    name: Joi.string().max(300).optional(),
    comment: Joi.string().max(1000).optional()
})