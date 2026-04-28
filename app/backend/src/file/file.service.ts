import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { EntityManager, Repository } from 'typeorm';
import { Passport } from '../passport/entities/passport.entity';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';
import { PassportService } from '../passport/passport.service';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository:Repository<File>,
    private readonly passportService: PassportService,
    private readonly historyService: HistoryItemsService
  ){}
  async create(createFileDto: CreateFileDto) {
    const passport = await this.passportService.findOne(createFileDto.passport_id)
    if (!passport){
      throw new NotFoundException(`passport ${createFileDto.passport_id} not found`)
    }
    const file = this.fileRepository.create(createFileDto)
    file.passport = passport
    const savedFile = await this.fileRepository.save(file);
    await this.historyService.logCreates(savedFile.file_id, ChangedTable.FILE)
    return savedFile
  }
  async createMany(
    files: Express.Multer.File[], 
    passportId: number,
    manager?: EntityManager
    ){
      const repository = manager ? manager.getRepository(File) : this.fileRepository
      const pas = manager
      ? await manager.getRepository(Passport).findOneBy({ passport_id: passportId })
      : await this.passportService.findOne(passportId)
      if (!pas) throw new NotFoundException()
      const savedFiles = await Promise.all(files.map(async(file)=>{
        const newFile = repository.create({
          name: file.originalname, 
          file_path: file.filename,
          passport: pas
        })
        const saved = await repository.save(newFile)
        await this.historyService.logCreates(newFile.file_id, ChangedTable.FILE)
        return saved
      }))
      return savedFiles
    }
  

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({
      where: {file_id: id},
      relations: ['passport']
    })
    if (!file) throw new NotFoundException(`file ${id} not found`)
    return file
  }

  async remove(id: number) {
    const file = await this.findOne(id);
    await this.historyService.logDeletes(id, ChangedTable.FILE)
    return await this.fileRepository.softRemove(file);
  }
}
