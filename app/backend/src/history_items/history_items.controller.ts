import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { HistoryItemsService } from './history_items.service';
import { CreateHistoryItemDto } from './dto/create-history_item.dto';
import { UpdateHistoryItemDto } from './dto/update-history_item.dto';
import { CreateHistoryItemScheme, updateHistoryItemScheme } from './dto/history_item-scheme';

@Controller('history-items')
export class HistoryItemsController {
  constructor(private readonly historyItemsService: HistoryItemsService) {}

  @Post()
  create(@Body() createHistoryItemDto: CreateHistoryItemDto) {
    const {error, value} = CreateHistoryItemScheme.validate(createHistoryItemDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.historyItemsService.create(value);
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
    const {error, value} = updateHistoryItemScheme.validate(updateHistoryItemDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.historyItemsService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyItemsService.remove(+id);
  }
}
