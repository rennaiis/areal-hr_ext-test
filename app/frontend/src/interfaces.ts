import type { ChangedTable } from "../../enums/ChangedTableType";
import type { HrOperationType } from "../../enums/HrOperationType";

export interface Adress{
    adress_id: number;
    employee_id: number;
    region: string;
    settlement: string;
    street: string;
    house: string;
    apartment?: string;
    building?: string;
}


export interface Employee {
    employee_id: number;
    passport_id: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    birth_date: Date;
}

export interface File{
    file_id: number;
    passport_id: number;
    name: string;
    file_path: string;
}

export interface HistoryItem{
    history_item_id: number;
    target_id: number;
    operation_object: ChangedTable;
    field_name: string;
    old_value?: string;
    new_value?: string;
}

export interface HrOperation{
    hr_operation_id: number;
    employee_id: number;
    department_id: number;
    position_id: number;
    salary: number;
    operation_type: HrOperationType
}
export interface Department {
    department_id: number;
    organization_id: number;
    parent_department_id?: number;
    name: string;
    comment?: string;
    children?: Department[]
}

export interface DepartmentEdit{
    name: string;
    comment?: string
}

export interface Organization{
    organization_id: number;
    name: string;
    comment?: string;
}

export interface Passport{
    passport_id: number;
    series: string;
    number: string;
    issued_by: string;
    issue_date: Date;
    department_code: string;
}


export interface Position {
    position_id: number;
    name: string;
}
