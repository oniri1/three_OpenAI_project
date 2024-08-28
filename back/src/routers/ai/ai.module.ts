// user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedBackService, AiService } from './ai.service';
import { AiController } from './ai.controller';
import { FeedBack, FeedBackSchema } from './mongoDB/feedback.schema';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entitiy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedBack.name, schema: FeedBackSchema },
    ]), // 몽고 스키마 등록
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AiController, UserController],
  providers: [FeedBackService, AiService, UserService],
})
export class AiModule {}
