import { ChangedTable } from "../../../../enums/ChangedTableType";
export class CreateHistoryItemDto {
    history_item_id: number;
    target_id: number;
    operation_object: ChangedTable;
    field_name: string;
    old_value: string;
    new_value: string;
}
