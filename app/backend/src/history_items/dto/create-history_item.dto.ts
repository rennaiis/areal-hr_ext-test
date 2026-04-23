import { ChangedTable } from "../../../../enums/ChangedTableType";
export class CreateHistoryItemDto {
    target_id: number;
    operation_object: ChangedTable;
    field_name: string;
    old_value?: string;
    new_value?: string;
    user_id: number;
}
