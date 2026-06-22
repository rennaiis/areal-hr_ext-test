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
import { FileService } from '../file/file.service';
import * as fs from 'fs/promises'

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>,
    private readonly historyService: HistoryItemsService,
    private readonly passportService: PassportService,
    private readonly adressService: AdressService,
    private readonly fileService: FileService,
    private readonly dataSource: DataSource,
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
  
  async createFullEmployee(hireEmployeeDto: HireEmployeeDto, files: Express.Multer.File[]){
    
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      const pas = await this.passportService.create(hireEmployeeDto.passport, queryRunner.manager)
      if (files && files.length > 0){
        await this.fileService.createMany(files, pas.passport_id, queryRunner.manager)
      }
      const emp = await this.create(hireEmployeeDto.employee,  pas.passport_id, queryRunner.manager)
      const adr = await this.adressService.create(hireEmployeeDto.adress, emp.employee_id, queryRunner.manager)
    
      await queryRunner.commitTransaction()
      return emp
    }catch(err){
      await queryRunner.rollbackTransaction()
      if (files?.length) {
      await Promise.allSettled(
        files.map(f => fs.unlink(f.path))
      )
    }

      throw err 
    }finally{
      await queryRunner.release()
    }
  }
  async findAll() {
    return await this.employeeRepository.find()
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: {employee_id: id}, 
      relations: ['passport', 'adress', 'hr_operations', 'user']
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
