import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserSchema, UpdateUserSchema } from './dto/user-scheme';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const {error, value} = CreateUserSchema.validate(createUserDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.userService.create(value);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const {error, value} = UpdateUserSchema.validate(updateUserDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.userService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
