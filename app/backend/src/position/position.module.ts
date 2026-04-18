import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { HistoryItemsModule } from '../history_items/history_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), HistoryItemsModule],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService]
})
export class PositionModule {}
