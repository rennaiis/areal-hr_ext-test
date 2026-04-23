export class CreateEmployeeDto {
    last_name: string;
    first_name: string;
    middle_name?: string;
    birth_date: Date;
    passport_id?: number;
     user_id?: number;
}
