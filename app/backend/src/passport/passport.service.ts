import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassportDto } from './dto/create-passport.dto';
import { UpdatePassportDto } from './dto/update-passport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passport } from './entities/passport.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PassportService {
  constructor(
    @InjectRepository(Passport)
    private readonly passportRepository: Repository<Passport>
  ){}
  async create(createPassportDto: CreatePassportDto) {
    const passport = this.passportRepository.create(createPassportDto)
    return await this.passportRepository.save(passport)
  }

  async findAll() {
    return await this.passportRepository.find({
      relations: ['files']
    })
  }

  async findOne(id: number) {
    const passport = await this.passportRepository.findOne({
      where:{passport_id: id},
      relations: ['files']
    })
    if (!passport) throw new NotFoundException(`Passport ${id} not found`)
    return passport
  }

  async update(id: number, updatePassportDto: UpdatePassportDto) {
    const passport = await this.findOne(id)
    const updated = Object.assign(passport, updatePassportDto)
    return await this.passportRepository.save(updated);
  }

  async remove(id: number) {
    const passport = await this.findOne(id)
    return await this.passportRepository.softRemove(passport);
  }
}
