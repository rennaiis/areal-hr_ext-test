import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { createFileSchema, updateFileSchema } from './dto/file-scheme';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HireEmployeeDto } from '../employee/dto/hire-employee.dto';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}


  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    const {error, value} = createFileSchema.validate(createFileDto)
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.fileService.create(value);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    const {error, value} = updateFileSchema.validate(updateFileDto)
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.fileService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
