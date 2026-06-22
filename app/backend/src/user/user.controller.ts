import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserSchema, UpdateUserSchema } from './dto/user-scheme';
import type { RequestWithUser } from '../types';
import { AdminGuard } from '../auth/session.guard';

@UseGuards(AdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: RequestWithUser) {
    const {error, value} = CreateUserSchema.validate(createUserDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.userService.create(value);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.userService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: RequestWithUser) {
    const {error, value} = UpdateUserSchema.validate(updateUserDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.userService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.userService.remove(+id);
  }
}
