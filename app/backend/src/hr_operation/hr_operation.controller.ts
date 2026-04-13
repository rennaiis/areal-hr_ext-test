import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { HrOperationService } from './hr_operation.service';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { UpdateHrOperationDto } from './dto/update-hr_operation.dto';
import { createHrOperationSchema, updateHrOperationSchema } from './dto/hr_operation-scheme';

@Controller('hr-operations')
export class HrOperationController {
  constructor(private readonly hrOperationService: HrOperationService) {}

  @Post()
  create(@Body() createHrOperationDto: CreateHrOperationDto) {
    const {error, value} = createHrOperationSchema.validate(createHrOperationDto)
      if (error){
        throw new BadRequestException(`Data mistake: ${error.message}`)
      }
    return this.hrOperationService.create(value);
  }

  @Get()
  findAll() {
    return this.hrOperationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrOperationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrOperationDto: UpdateHrOperationDto) {
    const {error, value} = updateHrOperationSchema.validate(updateHrOperationDto)
      if (error){
        throw new BadRequestException(`Data mistake: ${error.message}`)
      }
    return this.hrOperationService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrOperationService.remove(+id);
  }
}
