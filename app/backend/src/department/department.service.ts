import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository, TreeRepository } from 'typeorm';
import { Organization } from '../organization/entities/organization.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository:TreeRepository<Department>,

    @InjectRepository(Organization)
    private readonly organizationRepository:Repository<Organization>
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
    return await this.departmentRepository.save(department)
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
      if(!organization) throw new NotFoundException();
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
    const updated = Object.assign(dep, updateDepartmentDto)
    return await this.departmentRepository.save(updated)
  }
  
  async remove(id: number) {
    const dep = await this.findOne(id);
    return await this.departmentRepository.softRemove(dep);

  }
}
