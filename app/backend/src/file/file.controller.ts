import { Controller,  Post, Param, Delete, BadRequestException, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('session'))
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
    
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
