import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { HrOperationService } from './hr_operation.service';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { createHrOperationSchema } from './dto/hr_operation-scheme';

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
}
