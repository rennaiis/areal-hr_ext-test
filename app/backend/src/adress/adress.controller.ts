import { Controller, Get, Post, Body, Patch, Param, Delete, BadGatewayException, BadRequestException } from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { CreateAdressScheme, updateAdressScheme } from './dto/adress-scheme';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post(":id")
  create(
    @Param("id") employee_id: string, 
    @Body() createAdressDto: CreateAdressDto) {
    const {error, value} = CreateAdressScheme.validate(createAdressDto)
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
     return this.adressService.create(+employee_id, value);
  }

  @Get()
  findAll() {
    return this.adressService.findAll();
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressService.remove(+id);
  }
}
