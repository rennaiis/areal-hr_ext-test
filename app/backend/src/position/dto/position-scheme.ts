import * as Joi from 'joi'

export const CreatePositionScheme = Joi.object({
    name: Joi.string().max(300).required()
})

export const UpdatePassportScheme = CreatePositionScheme.fork(
    ['name'],
    (s)=>s.optional()
)