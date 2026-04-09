import * as Joi from 'joi'

export const CreateAdressScheme = Joi.object({
    employee_id: Joi.number().integer().positive().required(),
    region: Joi.string().max(150).required(),
    settlement: Joi.string().max(150).required(),
    street: Joi.string().max(150).required(),
    house: Joi.string().max(15).required(),
    apartment: Joi.string().max(15).optional(),
    building: Joi.string().max(15).optional(),
})

export const updateAdressScheme = CreateAdressScheme.fork(
    ['region', 'settlement', 'street', 'house'],
    (s) => s.optional()
)