import * as Joi from 'joi'
import { ChangedTable } from '../../../../enums/ChangedTableType';

export const CreateHistoryItemScheme = Joi.object({
  target_id: Joi.number().integer().required(),
  operation_object: Joi.string().valid(...Object.values(ChangedTable)).required(),
  field_name: Joi.string().max(50).required(),
  old_value: Joi.string().max(300).allow(null, ''),
  new_value: Joi.string().max(300).allow(null, '')
});

export const updateHistoryItemScheme = CreateHistoryItemScheme.fork(
    ['target_id', 'operation_object', 'field_name', 'new_value', 'old_value'], 
    (s) => s.optional()
);