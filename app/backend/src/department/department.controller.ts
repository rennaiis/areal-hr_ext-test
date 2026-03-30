import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentScheme, UpdateDepartmentScheme } from './dto/department-scheme';
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const {error, value} = CreateDepartmentScheme.validate(createDepartmentDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.departmentService.create(value);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
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
