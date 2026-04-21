import { Module } from '@nestjs/common';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { HistoryItemsModule } from '../history_items/history_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adress]), HistoryItemsModule],
  controllers: [AdressController],
  providers: [AdressService],
  exports: [AdressService]
})
export class AdressModule {}
