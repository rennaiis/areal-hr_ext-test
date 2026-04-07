export class CreateAdressDto {
    employee_id: number;
    region: string;
    settlement: string;
    street: string;
    house: string;
    apartment?: string;
    building?: string;
}
