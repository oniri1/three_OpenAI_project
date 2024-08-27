// user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedBackService, AiService } from './ai.service';
import { AiController } from './ai.controller';
import { FeedBack, FeedBackSchema } from './mongoDB/feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedBack.name, schema: FeedBackSchema },
    ]), // User 스키마 등록
  ],
  controllers: [AiController],
  providers: [FeedBackService, AiService],
})
export class AiModule {}
