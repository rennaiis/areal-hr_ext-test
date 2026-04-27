import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentScheme, UpdateDepartmentScheme } from './dto/department-scheme';
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAllDepartments() {
    return this.departmentService.findAll();
  }

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const {error, value} = CreateDepartmentScheme.validate(createDepartmentDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.departmentService.create(value);
  }
  @Get('org/flat/:organization_id')
  findAllFlat(@Param('organization_id') organization_id: string){
    return this.departmentService.findAllFlat(+organization_id)
  }
  

  @Get('org/:organization_id')
  findAll(@Param('organization_id') organization_id: string) {
    return this.departmentService.findAllByOrganization(+organization_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    const {error, value} = UpdateDepartmentScheme.validate(updateDepartmentDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.departmentService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
