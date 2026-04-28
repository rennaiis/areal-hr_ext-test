import { Injectable} from '@nestjs/common';
import { CreateHistoryItemDto } from './dto/create-history_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryItem } from './entities/history_item.entity';
import { Repository } from 'typeorm';
import { ChangedTable } from '../../../enums/ChangedTableType';

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

  async logUpdates(
    targetId: number, operation_object: ChangedTable, oldObject: any, updateDto: any){
      const keys = Object.keys(updateDto)
      for (const key of keys){
      const oldValue = oldObject[key]
      const newValue = updateDto[key]
      if (String(oldValue) !== String(newValue)){
        await this.create({
          user_id: 1,
          target_id: targetId, 
          operation_object: operation_object,
          field_name: key, 
          old_value: oldValue ? String(oldValue) : '',
          new_value: newValue ? String(newValue) : ''
        })
      }
     }
    }

  async logCreates(
    targetId: number, operation_object: ChangedTable){
      await this.create({
        user_id: 1,
        target_id: targetId, 
        operation_object: operation_object,
        field_name: 'all', 
        old_value: '', 
        new_value: 'created'
      })
    }
  async logDeletes(
    targetId: number, operation_object: ChangedTable){
    await this.create({
      user_id: 1,
      target_id: targetId, 
      operation_object: operation_object,
      field_name: 'all',
      old_value: 'exists', 
      new_value: 'deleted'
    })
  }

}
