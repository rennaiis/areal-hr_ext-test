import { Controller, Get, UseGuards } from '@nestjs/common';
import { HistoryItemsService } from './history_items.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('session'))
@Controller('history')
export class HistoryItemsController {
  constructor(private readonly historyItemsService: HistoryItemsService) {}

  @Get()
  findAll() {
    return this.historyItemsService.findAll();
  }
}
