import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistoryItemDto } from './dto/create-history_item.dto';
import { UpdateHistoryItemDto } from './dto/update-history_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryItem } from './entities/history_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryItemsService {
  constructor(
    @InjectRepository(HistoryItem)
    private readonly historyRepository:Repository<HistoryItem>
  ){}
  async create(createHistoryItemDto: CreateHistoryItemDto) {
    const hist = this.historyRepository.create(createHistoryItemDto)
    return await this.historyRepository.save(hist)
  }

  async findAll() {
    return await this.historyRepository.find();
  }

  async findOne(id: number) {
    const hist = await this.historyRepository.findOne({
      where:{history_item_id: id}
    })
    if (!hist) throw new NotFoundException(`Item ${id} not found`)
    return hist
  }

  async update(id: number, updateHistoryItemDto: UpdateHistoryItemDto) {
    const hist = await this.findOne(id)
    const updated = Object.assign(hist, updateHistoryItemDto)
    return await this.historyRepository.save(updated);
  }

  async remove(id: number) {
    const hist = await this.findOne(id)
    return await this.historyRepository.softRemove(hist);
  }
}
