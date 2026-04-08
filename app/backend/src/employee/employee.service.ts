import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>,
    private readonly historyService: HistoryItemsService
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto)
    const savedEmployee = this.employeeRepository.save(employee)
    await this.historyService.logCreates((await savedEmployee).employee_id, ChangedTable.EMPLOYEE)
    return savedEmployee
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
    await this.historyService.logUpdates(
      id, ChangedTable.EMPLOYEE, employee, updateEmployeeDto
    )
    const updated = Object.assign(employee, updateEmployeeDto)
    return  await this.employeeRepository.save(updated)
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    this.historyService.logDeletes(id, ChangedTable.EMPLOYEE)
    return await this.employeeRepository.softRemove(employee);
  }
}
