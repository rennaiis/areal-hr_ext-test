import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { PassportModule } from '../passport/passport.module';
import { HistoryItemsModule } from '../history_items/history_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), PassportModule, HistoryItemsModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
