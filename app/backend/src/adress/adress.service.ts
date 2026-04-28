import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { EntityManager, Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private readonly adressRepository:Repository<Adress>, 
    private readonly historyService: HistoryItemsService
  ){}

  async create(createAdressDto: CreateAdressDto, employeeId: number, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(Adress) : this.adressRepository
    const adress = repository.create({
      ...createAdressDto,
      employee: {employee_id: employeeId}
  });

  const savedAdress = await repository.save(adress)
  await this.historyService.logCreates(savedAdress.employee.employee_id, ChangedTable.ADRESS)
  return savedAdress

  }

  async findOne(id: number) {
    const adress = await this.adressRepository.findOne({
      where: {employee: {employee_id: id}},
      relations: ['employee']
    })
    if (!adress)throw new NotFoundException(`Adress of employee №${id} not found`)
    return adress; 
  }

  async update(id: number, updateAdressDto: UpdateAdressDto) {
    const adress = await this.findOne(id)
    await this.historyService.logUpdates(
      id, ChangedTable.ADRESS, adress, updateAdressDto
    )
    const updated = Object.assign(adress, updateAdressDto)
    return this.adressRepository.save(updated);
  }
}
