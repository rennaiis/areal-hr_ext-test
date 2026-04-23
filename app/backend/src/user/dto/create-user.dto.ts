import { UserRoles } from "../../../../enums/UserRoles";

export class CreateUserDto {
    employee_id?: number;
    last_name: string;
    first_name: string;
    middle_name: string;
    login: string;
    password_hash: string;
    role: UserRoles;
}