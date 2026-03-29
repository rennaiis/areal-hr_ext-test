import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { OrganizationModule } from './organization/organization.module';
import { PositionModule } from './position/position.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../../.env', 
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:(configService: ConfigService)=>{
      console.log('ХОСТ',  configService.get('DB_HOST'));
      console.log('ПОРТ',  +(configService.get('DB_PORT')));
      console.log('ЮЗЕР',  configService.get('DB_USER'));
      console.log('ПАРОЛЬ', configService.get('DB_PASSWORD'));
      console.log('ИМЯ БД', configService.get('DB_NAME'));
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
