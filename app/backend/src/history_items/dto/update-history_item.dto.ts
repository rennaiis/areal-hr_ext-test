import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryItemDto } from './create-history_item.dto';

export class UpdateHistoryItemDto extends PartialType(CreateHistoryItemDto) {}
