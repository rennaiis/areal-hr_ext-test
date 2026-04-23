import { UserRoles } from "../../../../enums/UserRoles";

export class CreateUserDto {
    user_id: number;
    employee_id: number;
    last_name: string;
    first_name: string;
    middle_name: string;
    login: string;
    password_hash: string;
    role: UserRoles;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}