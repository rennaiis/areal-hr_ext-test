import { operationObjectType } from "../entities/operationObjectType";

export class CreateOperationsHistoryDto {
    hr_operation_id: number;
    operation_object: operationObjectType;
    field_name: string;
    old_value: string;
    new_value: string;
}
