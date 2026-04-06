import { Injectable } from '@nestjs/common';
import { CreateHistoryItemDto } from './dto/create-history_item.dto';
import { UpdateHistoryItemDto } from './dto/update-history_item.dto';

@Injectable()
export class HistoryItemsService {
  create(createHistoryItemDto: CreateHistoryItemDto) {
    return 'This action adds a new historyItem';
  }

  findAll() {
    return `This action returns all historyItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyItem`;
  }

  update(id: number, updateHistoryItemDto: UpdateHistoryItemDto) {
    return `This action updates a #${id} historyItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyItem`;
  }
}
