import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeSchema, UpdateEmployeeSchema } from './dto/employee-scheme';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const {error, value} = CreateEmployeeSchema.validate(createEmployeeDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.employeeService.create(value);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const {error, value} = UpdateEmployeeSchema.validate(updateEmployeeDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.employeeService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
