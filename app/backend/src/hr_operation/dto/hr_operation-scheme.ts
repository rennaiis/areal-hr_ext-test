import * as Joi from 'joi';
import { OperationType } from '../entities/operationType';

export const createHrOperationSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    department_id: Joi.number().integer().required(),
    position_id: Joi.number().integer().required(),
    salary: Joi.number().precision(2).positive().required(),
    operation_type: Joi.string().valid(...Object.values(OperationType)).required(),
});