import * as Joi from 'joi';
import { HrOperationType } from '../../../../enums/HrOperationType';

export const createHrOperationSchema = Joi.object({
    employee_id: Joi.number().integer().positive().required(),
    department_id: Joi.number().integer().positive().required(),
    position_id: Joi.number().integer().required(),
    salary: Joi.number().precision(2).positive().required(),
    operation_type: Joi.string().valid(...Object.values(HrOperationType)).required(),
});