import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passport } from './entities/passport.entity';
import { HistoryItemsModule } from '../history_items/history_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Passport]), HistoryItemsModule],
  controllers: [PassportController],
  providers: [PassportService],
  exports: [PassportService]
})
export class PassportModule {}
