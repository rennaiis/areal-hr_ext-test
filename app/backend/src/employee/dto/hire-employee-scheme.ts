import * as Joi from 'joi';
import { CreateEmployeeSchema } from './employee-scheme';
import { CreatePassportScheme } from '../../passport/dto/passport-scheme';
import { CreateAdressScheme } from '../../adress/dto/adress-scheme';

export const HireEmployeeScheme = Joi.object({
    employee: CreateEmployeeSchema.required(),
    passport: CreatePassportScheme.required(),
    adress: CreateAdressScheme.required()
})