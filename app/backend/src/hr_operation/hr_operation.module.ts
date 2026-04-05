import { Module } from '@nestjs/common';
import { HrOperationService } from './hr_operation.service';
import { HrOperationController } from './hr_operation.controller';

@Module({
  controllers: [HrOperationController],
  providers: [HrOperationService],
})
export class HrOperationModule {}
