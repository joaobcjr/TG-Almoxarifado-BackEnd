import { Module } from '@nestjs/common';
import { LocalModule } from './local/local.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LocalModule
  ]
})
export class AppModule { }
