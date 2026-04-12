import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PassportService } from './passport.service';
import { CreatePassportDto } from './dto/create-passport.dto';
import { UpdatePassportDto } from './dto/update-passport.dto';
import { CreatePassportScheme } from './dto/passport-scheme';
import { UpdatePassportScheme } from '../passport/dto/passport-scheme';

@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Post()
  create(@Body() createPassportDto: CreatePassportDto) {
    const {error, value} = CreatePassportScheme.validate(createPassportDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.passportService.create(value);
  }

  @Get()
  findAll() {
    return this.passportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassportDto: UpdatePassportDto) {
    const {error, value} = UpdatePassportScheme.validate(updatePassportDto);
      if (error){
        throw new BadRequestException(`Data mistake: ${error.message}`)
      }
    return this.passportService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passportService.remove(+id);
  }
}
