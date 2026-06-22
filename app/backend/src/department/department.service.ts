import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { ChangeStream, Repository, TreeRepository } from 'typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository:TreeRepository<Department>,
    private readonly organizationService:OrganizationService,
    private readonly historyService: HistoryItemsService
  ){}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const organization = await this.organizationService.findOne(createDepartmentDto.organization_id)
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
    await this.historyService.logCreates(
      savedDepartment.department_id,
      ChangedTable.DEPARTMENT
    );    
    return savedDepartment
  }

  async findAllByOrganization(organization_id: number) {
    const trees =await this.departmentRepository.findTrees({
      relations: ['organization']
    })
    const filteredByOrganization = trees.filter(n => n.organization.organization_id === organization_id)
    return this.filterDeleted(filteredByOrganization)
  }

  async findAll(){
    return await this.departmentRepository.find()
  }
  
  async findAllFlat(organization_id: number){
    return await this.departmentRepository.find(
      {
        where:{
          organization:{organization_id: organization_id}
        }
      }
    )
  }
  
  filterDeleted(tree: Department[]) {
  return tree
    .filter(n => n.deleted_at == null)
    .map(n => ({
      ...n,
      children: n.children ? this.filterDeleted(n.children) : [],
    }));
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
    const dep = await this.findOne(id);
    const updated = Object.assign(dep, updateDepartmentDto)
    await this.historyService.logUpdates(id, ChangedTable.DEPARTMENT, dep, updateDepartmentDto)
    return  await this.departmentRepository.save(updated)
  }
  
  async remove(id: number) {
    const dep = await this.findOne(id)
    if (!dep){
      throw new NotFoundException()
    }
    const children = await this.departmentRepository.findDescendants(dep)
    await this.historyService.logDeletes(id, ChangedTable.DEPARTMENT)
    return await this.departmentRepository.softRemove(children)
    
  }

}
