import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private readonly adressRepository:Repository<Adress>, 
    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>
  ){}

  async create(employeeId: number, createAdressDto: CreateAdressDto) {
    const employee = await this.employeeRepository.findOneBy({employee_id: employeeId});
    if (!employee) throw new NotFoundException('no such employee');
    const adress = this.adressRepository.create({
      ...createAdressDto,
      employee: employee
  });
    return this.adressRepository.save(adress)
  }

  async findAll() {
    return await this.adressRepository.find()
  }

  async findOne(id: number) {
    const adress = await this.adressRepository.findOne({
      where: {employee: {employee_id: id}},
      relations: ['employee']
    })
    if (!adress)throw new NotFoundException(`Adress of employee №${id} not found`)
    return adress; 
  }

  async update(id: number, updateAdressDto: UpdateAdressDto) {
    const adress = await this.findOne(id)
    const updated = Object.assign(adress, updateAdressDto)
    return this.adressRepository.save(updated);
  }

  async remove(id: number) {
    const adress = await this.findOne(id);
    return this.adressRepository.softRemove(adress)
  }
}
