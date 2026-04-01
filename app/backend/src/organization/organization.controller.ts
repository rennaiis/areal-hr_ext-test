import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CreateOrganisationScheme, UpdateOrganisationScheme } from './dto/organisation-scheme'; 
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    const {error, value} = CreateOrganisationScheme.validate(createOrganizationDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.organizationService.create(value);
  }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    const {error, value} = UpdateOrganisationScheme.validate(updateOrganizationDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.organizationService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}
