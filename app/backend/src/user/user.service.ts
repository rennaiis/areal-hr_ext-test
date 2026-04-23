import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HistoryItemsService } from '../history_items/history_items.service';
import { ChangedTable } from '../../../enums/ChangedTableType';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly historyService: HistoryItemsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    const savedUser = this.userRepository.save(user)
    await this.historyService.logCreates((await savedUser).user_id, ChangedTable.ORGANIZATION)
    return savedUser  
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['employee'], 
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['employee'],
    });
    if (!user) throw new NotFoundException()
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updated = Object.assign(user, updateUserDto)
    await this.historyService.logUpdates(
      id, ChangedTable.USER, user, updateUserDto
    )
    return await this.userRepository.save(updated);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    this.historyService.logDeletes(id, ChangedTable.USER)
    return await this.userRepository.softRemove(user);
  }
}
