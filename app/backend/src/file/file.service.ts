import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { Passport } from '../passport/entities/passport.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository:Repository<File>,
    @InjectRepository(Passport)
    private readonly passportRepository:Repository<Passport>
  ){}
  async create(createFileDto: CreateFileDto) {
    const passport = await this.passportRepository.findOneBy({
      passport_id: createFileDto.passport_id
    })
    if (!passport){
      throw new NotFoundException(`passport ${createFileDto.passport_id} not found`)
    }
    const file = this.fileRepository.create(createFileDto)
    file.passport = passport
    return await this.fileRepository.save(file);
  }

  async findAll() {
    return await 
      this.fileRepository.find({
      relations: ['passport']
    });
  }

  async findOne(id: number) {
    const file = await this.fileRepository.findOne({
      where: {file_id: id},
      relations: ['passport']
    })
    if (!file) throw new NotFoundException(`file ${id} not found`)
    return file
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const file = await this.findOne(id)
    if (updateFileDto.passport_id) {
      const passport = await this.passportRepository.findOneBy({ 
        passport_id: updateFileDto.passport_id 
      });
      if (!passport) throw new NotFoundException(`passport ${updateFileDto.passport_id} not found`);
      file.passport = passport;
    }
    const updated = Object.assign(file, updateFileDto)
    return await this.fileRepository.save(updated)
  }

  async remove(id: number) {
    const file = await this.findOne(id);
    return await this.fileRepository.softRemove(file);
  }
}
