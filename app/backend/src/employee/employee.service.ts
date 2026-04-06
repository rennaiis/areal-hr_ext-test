import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(createEmployeeDto)
    return this.employeeRepository.save(employee)
  }

  async findAll() {
    return await this.employeeRepository.find()
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: {employee_id: id}, 
      relations: ['passport', 'adress', 'hr_operations']
    })
    if (!employee) throw new NotFoundException(`employee ${id} not found`)
    return employee
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id)
    const updated = Object.assign(employee, updateEmployeeDto)
    return await this.employeeRepository.save(updated)
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    return await this.employeeRepository.softRemove(employee);
  }
}
