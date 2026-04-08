import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { UpdateHrOperationDto } from './dto/update-hr_operation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HrOperation } from './entities/hr_operation.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';

@Injectable()
export class HrOperationService {
  constructor(
    @InjectRepository(HrOperation)
    private readonly HrOperationRepository:Repository<HrOperation>,

    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepository:Repository<Department>,

    @InjectRepository(Position)
    private readonly positionRepository:Repository<Position>,

    private readonly historyService: HistoryItemsService
  ){}

  async create(createHrOperationDto: CreateHrOperationDto) {
    const employee = await this.employeeRepository.findOneBy({
      employee_id: createHrOperationDto.employee_id
    })
    if (!employee){
      throw new NotFoundException(`employee ${createHrOperationDto.employee_id} not found`)
    }

    const department = await this.departmentRepository.findOneBy({
      department_id: createHrOperationDto.department_id
    })
    if (!department){
      throw new NotFoundException(`department ${createHrOperationDto.department_id} not found`)
    }

    const position = await this.positionRepository.findOneBy({
      position_id: createHrOperationDto.position_id
    })
    if (!position){
      throw new NotFoundException(`position ${createHrOperationDto.position_id} not found`)
    }

    const hr_operation = this.HrOperationRepository.create(createHrOperationDto)
    hr_operation.employee = employee
    hr_operation.department = department
    hr_operation.position = position
    const saved_operation = this.HrOperationRepository.save(hr_operation);
    await this.historyService.logCreates((await saved_operation).operation_id, ChangedTable.OPERATION)
    return saved_operation
   
  }

  async findAll() {
    return await
    this.HrOperationRepository.find({
      relations: ['department', 'position', 'employee']
    })
  }

  async findOne(id: number) {
    
    const hr_operation = await this.HrOperationRepository.findOne({
      where: {operation_id: id},
      relations: ['department', 'position', 'employee']
    })
    if (!hr_operation) throw new NotFoundException(`hr_operation ${id} not found`)
    return hr_operation
  }

  async update(id: number, updateHrOperationDto: UpdateHrOperationDto) {
    const hr_operation = await this.findOne(id)
    if (updateHrOperationDto.department_id){
      const department = await this.departmentRepository.findOneBy({
      department_id: updateHrOperationDto.department_id
      })
      if (!department){
        throw new NotFoundException(`department ${updateHrOperationDto.department_id} not found`)
      }
      hr_operation.department = department
    }
    
    if (updateHrOperationDto.position_id){
      const position = await this.positionRepository.findOneBy({
      position_id: updateHrOperationDto.position_id
      })
      if (!position){
        throw new NotFoundException(`position ${updateHrOperationDto.department_id} not found`)
      }
      hr_operation.position = position
    }

    if (updateHrOperationDto.employee_id){
      const employee = await this.departmentRepository.findOneBy({
      department_id: updateHrOperationDto.employee_id
      })
      if (!employee){
        throw new NotFoundException(`employee ${updateHrOperationDto.department_id} not found`)
      }
      hr_operation.department = employee
    }
    await this.historyService.logUpdates(
      id, ChangedTable.OPERATION, hr_operation, updateHrOperationDto
    )
    const updated = Object.assign(hr_operation, updateHrOperationDto)
    return await this.HrOperationRepository.save(updated)
  }

  async remove(id: number) {
    const hr_operation = await this.findOne(id);
    return await this.HrOperationRepository.softRemove(hr_operation);
  }
}
