export class CreateDepartmentDto {
    organization_id: number;
    parent_department_id?: number;
    name: string;
    comment?: string;
}
