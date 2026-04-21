import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { HistoryItemsModule } from '../history_items/history_items.module';
import { PassportModule } from '../passport/passport.module';
import { AdressModule } from '../adress/adress.module';

@Module({
  imports:[TypeOrmModule.forFeature([Employee]), HistoryItemsModule, PassportModule, AdressModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
