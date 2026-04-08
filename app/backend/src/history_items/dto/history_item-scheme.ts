import * as Joi from 'joi'
import { ChangedTable } from '../../../../enums/ChangedTableType';

export const CreateHistoryItemScheme = Joi.object({
  target_id: Joi.number().integer().required(),
  operation_object: Joi.string().valid(...Object.values(ChangedTable)).required(),
  field_name: Joi.string().max(50).required(),
  old_value: Joi.string().max(300).allow(null, '').optional(),
  new_value: Joi.string().max(300).allow(null, '').optional()
});