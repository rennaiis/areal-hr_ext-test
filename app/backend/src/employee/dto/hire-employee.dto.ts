import { CreateAdressDto } from "../../adress/dto/create-adress.dto";
import { CreatePassportDto } from "../../passport/dto/create-passport.dto";
import { CreateEmployeeDto } from "./create-employee.dto";

export class HireEmployeeDto{
    employee: CreateEmployeeDto
    passport: CreatePassportDto
    adress: CreateAdressDto
}