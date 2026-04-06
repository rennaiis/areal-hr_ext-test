import { OperationType } from "../entities/operationType";

export class CreateHrOperationDto {
    employee_id: number;
    department_id: number;
    position_id: number;
    salary: number;
    operation_type: OperationType;
}