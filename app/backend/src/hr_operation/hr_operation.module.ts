import { Module } from '@nestjs/common';
import { HrOperationService } from './hr_operation.service';
import { HrOperationController } from './hr_operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrOperation } from './entities/hr_operation.entity';
import { EmployeeModule } from '../employee/employee.module';
import { DepartmentModule } from '../department/department.module';
import { PositionModule } from '../position/position.module';
import { HistoryItemsModule } from '../history_items/history_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([HrOperation]), EmployeeModule, DepartmentModule, PositionModule, HistoryItemsModule],
  controllers: [HrOperationController],
  providers: [HrOperationService],
})
export class HrOperationModule {}
