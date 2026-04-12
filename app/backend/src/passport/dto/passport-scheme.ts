import * as Joi from 'joi'
export const CreatePassportScheme = Joi.object({
    employee_id: Joi.number().integer().positive().required(), 
    series: Joi.string().pattern(/^\d{4}$/).required(),
    number: Joi.string().pattern(/^\d{6}$/).required(), 
    issued_by: Joi.string().max(500).required(),
    issue_date: Joi.date().iso().max('now').required(),
    department_code: Joi.string().pattern(/^\d{3}-\d{3}$/).required()
})

export const UpdatePassportScheme = CreatePassportScheme.fork(
    ['employee_id', 'series', 'number', 'issued_by', 'issue_date', 'department_code'],
    (s)=>s.optional()
)