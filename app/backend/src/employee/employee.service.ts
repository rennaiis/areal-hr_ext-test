import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';
import { HireEmployeeDto } from './dto/hire-employee.dto';
import { PassportService } from '../passport/passport.service';
import { AdressService } from '../adress/adress.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>,
    private readonly historyService: HistoryItemsService,
    private readonly passportService: PassportService,
    private readonly adressService: AdressService,
    private readonly dataSource: DataSource


  ){}
  async create(createEmployeeDto: CreateEmployeeDto, passportId: number, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(Employee) : this.employeeRepository
    const employee = repository.create({
      ...createEmployeeDto,
      passport_id: passportId
    })
    const savedEmployee = await repository.save(employee)
    await this.historyService.logCreates(await savedEmployee.employee_id, ChangedTable.EMPLOYEE)
    return savedEmployee
  }
  async createFullEmployee(hireEmployeeDto: HireEmployeeDto){
    
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      const pas = await this.passportService.create(hireEmployeeDto.passport, queryRunner.manager)
      const emp = await this.create(hireEmployeeDto.employee,  pas.passport_id, queryRunner.manager)
      const adr = await this.adressService.create( emp.employee_id, hireEmployeeDto.adress, queryRunner.manager)
      await queryRunner.commitTransaction()
    }catch(err){
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release
    }
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
    await this.historyService.logDeletes(id, ChangedTable.EMPLOYEE)
    return await this.employeeRepository.softRemove(employee);
  }
}
