import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
      @InjectRepository(Position)
      private readonly positionRepository:Repository<Position>
    ){}
  
  async create(createPositionDto: CreatePositionDto) {
    const pos = this.positionRepository.create(createPositionDto)
    return await this.positionRepository.save(pos) 
  }

  async findAll() {
    return await this.positionRepository.find();
  }

 async findOne(id: number) {
    const pos = await this.positionRepository.findOne({
      where: {position_id: id}
    })
    if (!pos)throw new NotFoundException(`Position ${id} not found`)
    return await this.positionRepository.save(pos);
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const pos = await this.findOne(id)
    const updated = Object.assign(pos, updatePositionDto)
    return await this.positionRepository.save(updated)
  }

  async remove(id: number) {
    const pos = await this.findOne(id)
    return await this.positionRepository.softRemove(pos)
  }
}
