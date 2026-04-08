import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';

@Injectable()
export class OrganizationService {
  constructor(
      @InjectRepository(Organization)
      private readonly organizationRepository: Repository<Organization>,
      private readonly historyService: HistoryItemsService
    ){}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const org = this.organizationRepository.create(createOrganizationDto)
    const savedOrg = this.organizationRepository.save(org)
    await this.historyService.logCreates((await savedOrg).organization_id, ChangedTable.ORGANIZATION)
    return savedOrg
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
    await this.historyService.logUpdates(
      id, ChangedTable.ORGANIZATION, org, updateOrganizationDto
    )
    const updated = Object.assign(org, updateOrganizationDto)
    return await this.organizationRepository.save(updated);
  }

  async remove(id: number) {
    const org = await this.findOne(id)
    return await this.organizationRepository.softRemove(org);
  }
}
