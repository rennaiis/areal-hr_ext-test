import { Module } from '@nestjs/common';
import { HistoryItemsService } from './history_items.service';
import { HistoryItemsController } from './history_items.controller';

@Module({
  controllers: [HistoryItemsController],
  providers: [HistoryItemsService],
})
export class HistoryItemsModule {}
