import { Module } from '@nestjs/common';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalRepository } from './local.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocalRepository
    ])
  ],
  controllers: [LocalController],
  providers: [LocalService]
})
export class LocalModule { }
