import { Controller, Get,  Body, Patch, Param,  BadRequestException } from '@nestjs/common';
import { PassportService } from './passport.service';
import { UpdatePassportDto } from './dto/update-passport.dto';
import { UpdatePassportScheme } from '../passport/dto/passport-scheme';

@Controller('passports')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}
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

}
