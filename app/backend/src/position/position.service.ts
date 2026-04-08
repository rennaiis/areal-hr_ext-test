import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';

@Injectable()
export class PositionService {
  constructor(
      @InjectRepository(Position)
      private readonly positionRepository:Repository<Position>,
      private readonly historyService: HistoryItemsService
    ){}
  
  async create(createPositionDto: CreatePositionDto) {
    const pos = this.positionRepository.create(createPositionDto)
    const savedPos = this.positionRepository.save(pos) 
    await this.historyService.logCreates((await savedPos).position_id, ChangedTable.POSITION)
    return savedPos
  }

  async findAll() {
    return await this.positionRepository.find();
  }

 async findOne(id: number) {
    const pos = await this.positionRepository.findOne({
      where: {position_id: id}
    })
    if (!pos)throw new NotFoundException(`Position ${id} not found`)
    return await  pos;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const pos = await this.findOne(id)
    await this.historyService.logUpdates(
      id, ChangedTable.POSITION, pos, updatePositionDto
    )
    const updated = Object.assign(pos, updatePositionDto)
    return await this.positionRepository.save(updated)
  }

  async remove(id: number) {
    const pos = await this.findOne(id)
    this.historyService.logDeletes(id, ChangedTable.POSITION)
    return await this.positionRepository.softRemove(pos)
  }
}
