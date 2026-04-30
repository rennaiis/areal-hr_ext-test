import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserSchema, UpdateUserSchema } from './dto/user-scheme';
import { AuthGuard } from '@nestjs/passport';
import type { RequestWithUser } from '../types';
import { UserRoles } from '../../../enums/UserRoles';

function isUserAdmin(req: RequestWithUser){
  if( req.user.role !== UserRoles.ADMIN){
    console.log('user is not Admin')
    throw new ForbiddenException()
  }
}
function hasReqUser(req: RequestWithUser){
  if (!req.user || !req.user.role){
    console.log("no req.user");
    throw new UnauthorizedException()
  }
}
@UseGuards(AuthGuard('session'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: RequestWithUser) {
    hasReqUser(req)
    isUserAdmin(req)    
    const {error, value} = CreateUserSchema.validate(createUserDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.userService.create(value);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    hasReqUser(req)
    isUserAdmin(req)
    return this.userService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: RequestWithUser) {
    hasReqUser(req)
    isUserAdmin(req)
    const {error, value} = UpdateUserSchema.validate(updateUserDto);
        if (error){
          throw new BadRequestException(`Data mistake: ${error.message}`)
        }
    return this.userService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    hasReqUser(req)
    isUserAdmin(req)
    return this.userService.remove(+id);
  }
}
