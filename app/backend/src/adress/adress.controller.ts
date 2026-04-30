import { Controller, Get, Post, Body, Patch, Param, Delete, BadGatewayException, BadRequestException, UseGuards } from '@nestjs/common';
import { AdressService } from './adress.service';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { updateAdressScheme } from './dto/adress-scheme';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('session'))
@Controller('adresses')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdressDto: UpdateAdressDto) {
    const {error, value} = updateAdressScheme.validate(updateAdressDto)
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.adressService.update(+id, updateAdressDto);
  }
}
