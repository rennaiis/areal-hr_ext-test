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


  @Post('uploadFiles/:passportId')
    @UseInterceptors(FilesInterceptor('files', 15, {
      storage: diskStorage({
        destination: './passportFiles', 
        filename: (req, file, cb)=>{
          const uniqueName = Date.now() + Math.random()
          const ext = extname(file.originalname)
          cb(null, `${uniqueName}${ext}`)
        }
      })
    }))
    async uploadFiles(@Param('passportId') passportId: string,
    @UploadedFiles() files: Express.Multer.File[]
    ){
      if (!files || files.length == 0){
        throw new BadRequestException('no files uploaded')
      }
      return await this.fileService.createMany(files, +passportId)
    }


  @Get()
  async findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
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
