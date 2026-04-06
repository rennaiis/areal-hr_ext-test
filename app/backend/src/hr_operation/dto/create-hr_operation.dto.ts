import { HrOperationType } from "../../../../enums/HrOperationType";

export class CreateHrOperationDto {
    employee_id: number;
    department_id: number;
    position_id: number;
    salary: number;
    operation_type: HrOperationType;
}