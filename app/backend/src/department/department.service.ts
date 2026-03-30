import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository:Repository<Department>
  ){}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto)
    return await this.departmentRepository.save(department)
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
    const updated = Object.assign(dep, updateDepartmentDto)
    return await this.departmentRepository.save(updated)
  }
  


  async remove(id: number) {
    const dep = await this.findOne(id);
    return await this.departmentRepository.softRemove(dep);

  }
}
