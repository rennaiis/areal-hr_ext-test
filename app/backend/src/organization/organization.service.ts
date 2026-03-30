import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
      @InjectRepository(Organization)
      private readonly organizationRepository: Repository<Organization>
    ){}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const org = this.organizationRepository.create(createOrganizationDto)
    return await this.organizationRepository.save(org)
  }

  async findAll() {
    return await this.organizationRepository.find({
      relations: ['departments']
    })
  }

  async findOne(id: number) {
    const org = await this.organizationRepository.findOne({
      where:{organization_id: id},
      relations: ['departments']
     })
    if (!org) throw new NotFoundException(`Organization ${id} not found`)
    return org
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const org = await this.findOne(id)
    const updated = Object.assign(org, updateOrganizationDto)
    return await this.organizationRepository.save(updated);
  }

  async remove(id: number) {
    const org = await this.findOne(id)
    return await this.organizationRepository.softRemove(org);
  }
}
