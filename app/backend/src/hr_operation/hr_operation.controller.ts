import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HrOperationService } from './hr_operation.service';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { UpdateHrOperationDto } from './dto/update-hr_operation.dto';

@Controller('hr-operation')
export class HrOperationController {
  constructor(private readonly hrOperationService: HrOperationService) {}

  @Post()
  create(@Body() createHrOperationDto: CreateHrOperationDto) {
    return this.hrOperationService.create(createHrOperationDto);
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
    return this.hrOperationService.update(+id, updateHrOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrOperationService.remove(+id);
  }
}
