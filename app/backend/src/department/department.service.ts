import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { ChangeStream, Repository, TreeRepository } from 'typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository:TreeRepository<Department>,

    @InjectRepository(Organization)
    private readonly organizationRepository:Repository<Organization>,

    private readonly historyService: HistoryItemsService
  ){}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const organization = await this.organizationRepository.findOneBy({
      organization_id: createDepartmentDto.organization_id})
    if (!organization){
      throw new NotFoundException()
    }
    const department = this.departmentRepository.create(createDepartmentDto)
    department.organization = organization

    if (createDepartmentDto.parent_department_id) {
      const parent = await this.departmentRepository.findOneBy({ 
          department_id: createDepartmentDto.parent_department_id 
      })
      if (parent) department.parent_department = parent
    }
    const savedDepartment = await this.departmentRepository.save(department)
    await this.historyService.logCreates((await savedDepartment).department_id, ChangedTable.DEPARTMENT)
    return savedDepartment
  }
  async findAllTree() {
    return await this.departmentRepository.findTrees();
  }

  async findAll() {
    return await 
      this.departmentRepository.find({
      relations: ['organization', 'parent_department']
    });
  }

 async findOne(id: number) {
    const dep = await this.departmentRepository.findOne({
      where: {department_id: id},
      relations: ['organization', 'parent_department']
    })
    if (!dep) throw new NotFoundException(`department ${id} not found`)
    return dep
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const dep = await this.findOne(id)
    if (updateDepartmentDto.organization_id){
      const organization = await this.organizationRepository.findOneBy({
        organization_id: updateDepartmentDto.organization_id
      })
      if(!organization) throw new NotFoundException(`organization ${id} not found`);
      dep.organization = organization
    }

    if (updateDepartmentDto.parent_department_id !== undefined){
      if (updateDepartmentDto.parent_department_id === null){
        dep.parent_department = null;
      }else{
        const parent =  await this.departmentRepository.findOneBy({ 
            department_id: updateDepartmentDto.parent_department_id 
        })
         if (!parent) throw new NotFoundException('Parent not found');
        dep.parent_department = parent;
      }
    }
    await this.historyService.logUpdates(
      id, ChangedTable.DEPARTMENT, dep, updateDepartmentDto
    )
    const updated = Object.assign(dep, updateDepartmentDto)
    return await this.departmentRepository.save(updated)
  }
  
  async remove(id: number) {
    const dep = await this.findOne(id);
    this.historyService.logDeletes(id, ChangedTable.DEPARTMENT)
    return await this.departmentRepository.softRemove(dep);

  }
}
