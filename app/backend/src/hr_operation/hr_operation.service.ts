import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HrOperation } from './entities/hr_operation.entity';
import { Repository } from 'typeorm';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';
import { EmployeeService } from '../employee/employee.service';
import { DepartmentService } from '../department/department.service';
import { PositionService } from '../position/position.service';

@Injectable()
export class HrOperationService {
  constructor(
    @InjectRepository(HrOperation)
    private readonly HrOperationRepository:Repository<HrOperation>,

    private readonly employeeService: EmployeeService,

    private readonly departmentService: DepartmentService,

    private readonly positionService: PositionService,

    private readonly historyService: HistoryItemsService
  ){}

  async create(createHrOperationDto: CreateHrOperationDto) {
    const employee = await this.employeeService.findOne(createHrOperationDto.employee_id)
    if (!employee){
      throw new NotFoundException(`employee ${createHrOperationDto.employee_id} not found`)
    }

    const department = await this.departmentService.findOne(createHrOperationDto.department_id)
    if (!department){
      throw new NotFoundException(`department ${createHrOperationDto.department_id} not found`)
    }

    const position = await this.positionService.findOne(createHrOperationDto.position_id)
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
      relations: ['department', 'position', 'employee', 'department.organization']
    })
  }
}
