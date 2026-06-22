import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';

import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateEmployeeSchema } from './dto/employee-scheme';
import { HireEmployeeDto, HireEmployeeRawDto } from './dto/hire-employee.dto';
import { HireEmployeeScheme } from './dto/hire-employee-scheme';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { RequestWithUser } from '../types';
import { SessionGuard } from '../auth/session.guard';

@UseGuards(SessionGuard)
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
  @Post('hire')
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
  async hireEmployee(@Body() payload: HireEmployeeRawDto, 
  @UploadedFiles() files: Express.Multer.File[],
  @Req() req: RequestWithUser
  ){
    const hireEmployeeDto: HireEmployeeDto = {
      employee: JSON.parse(payload.employee),
      adress: JSON.parse(payload.adress),
      passport: JSON.parse(payload.passport)
    }
    const {error, value} = HireEmployeeScheme.validate(hireEmployeeDto)
    if (error){
         throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return await this.employeeService.createFullEmployee(value, files)
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const {error, value} = UpdateEmployeeSchema.validate(updateEmployeeDto);
    if (error){
      throw new BadRequestException(`Data mistake: ${error.message}`)
    }
    return this.employeeService.update(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.employeeService.remove(+id);
  }
}
