import { Module } from '@nestjs/common';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { EmployeeModule } from '../employee/employee.module';
import { HistoryItemsModule } from '../history_items/history_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adress]), EmployeeModule, HistoryItemsModule],
  controllers: [AdressController],
  providers: [AdressService],
})
export class AdressModule {}
