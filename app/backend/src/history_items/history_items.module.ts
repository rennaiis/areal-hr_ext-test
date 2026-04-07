import { Module } from '@nestjs/common';
import { HistoryItemsService } from './history_items.service';
import { HistoryItemsController } from './history_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryItem } from './entities/history_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryItem])],
  controllers: [HistoryItemsController],
  providers: [HistoryItemsService],
})
export class HistoryItemsModule {}
