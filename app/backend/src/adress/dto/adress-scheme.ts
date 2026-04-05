import * as Joi from 'joi'

export const createAdressScheme = Joi.object({
    region: Joi.string().max(150).required,
    settlement: Joi.string().max(150).required,
    street: Joi.string().max(150).required,
    house: Joi.string().max(15).required,
    apartment: Joi.string().max(15).optional,
    building: Joi.string().max(15).optional,
})

export const updateAdressScheme = Joi.object({
    region: Joi.string().max(150).optional,
    settlement: Joi.string().max(150).optional,
    street: Joi.string().max(150).optional,
    house: Joi.string().max(15).optional,
    apartment: Joi.string().max(15).optional,
    building: Joi.string().max(15).optional,
})
