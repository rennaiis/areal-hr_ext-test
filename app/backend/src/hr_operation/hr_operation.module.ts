import { Module } from '@nestjs/common';
import { HrOperationService } from './hr_operation.service';
import { HrOperationController } from './hr_operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrOperation } from './entities/hr_operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrOperation])],
  controllers: [HrOperationController],
  providers: [HrOperationService],
})
export class HrOperationModule {}
