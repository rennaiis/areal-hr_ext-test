import { Controller, Get } from '@nestjs/common';
import { HistoryItemsService } from './history_items.service';

@Controller('history')
export class HistoryItemsController {
  constructor(private readonly historyItemsService: HistoryItemsService) {}

  @Get()
  findAll() {
    return this.historyItemsService.findAll();
  }
}
