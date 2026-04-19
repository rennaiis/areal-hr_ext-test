import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto{
    name?: string;
    comment?: string;
}
