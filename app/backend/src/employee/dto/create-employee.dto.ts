export class CreateEmployeeDto {
    passport_id: number;
    adress_id: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    birth_date: Date;
}
