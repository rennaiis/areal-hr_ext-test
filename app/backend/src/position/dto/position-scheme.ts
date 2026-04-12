import * as Joi from 'joi'

export const CreatePositionScheme = Joi.object({
    name: Joi.string().max(300).required()
})

export const UpdatePositionScheme = CreatePositionScheme.fork(
    ['name'],
    (s)=>s.optional()
)