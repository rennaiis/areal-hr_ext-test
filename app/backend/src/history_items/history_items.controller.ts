import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryItemsService } from './history_items.service';
import { CreateHistoryItemDto } from './dto/create-history_item.dto';
import { UpdateHistoryItemDto } from './dto/update-history_item.dto';

@Controller('history-items')
export class HistoryItemsController {
  constructor(private readonly historyItemsService: HistoryItemsService) {}

  @Post()
  create(@Body() createHistoryItemDto: CreateHistoryItemDto) {
    return this.historyItemsService.create(createHistoryItemDto);
  }

  @Get()
  findAll() {
    return this.historyItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryItemDto: UpdateHistoryItemDto) {
    return this.historyItemsService.update(+id, updateHistoryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyItemsService.remove(+id);
  }
}
