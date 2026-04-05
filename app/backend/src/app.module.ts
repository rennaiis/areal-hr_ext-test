import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { OrganizationModule } from './organization/organization.module';
import { PositionModule } from './position/position.module';
import { DepartmentModule } from './department/department.module';
import { Organization } from './organization/entities/organization.entity';
import { Department } from './department/entities/department.entity';
import { Position } from './position/entities/position.entity'

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../../.env', 
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:(configService: ConfigService)=>{
      return{
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +(configService.get('DB_PORT')), 
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }
    }
  }),
  OrganizationModule,
  PositionModule,
  DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
