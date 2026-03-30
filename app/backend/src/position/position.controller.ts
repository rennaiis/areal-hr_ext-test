import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { CreatePositionScheme, UpdatePositionScheme } from './dto/position-scheme';
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    const {error, value} = CreatePositionScheme.validate(CreatePositionDto);
      if (error){
        throw new BadRequestException(`Data mistake: ${error.message}`)
      }
    return this.positionService.create(value);
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    const {error, value} = UpdatePositionScheme.validate(UpdatePositionDto);
      if (error){
        throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.positionService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
