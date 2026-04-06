export class CreatePassportDto {
    employee_id: number;
    series: string;
    number: string;
    issued_by: string;
    issue_date: Date;
    department_code: string;
}
