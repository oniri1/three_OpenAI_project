import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedBack } from './mongoDB/feedback.schema';

import { ConfigService } from '@nestjs/config';
import { ChatCompletionMessageParam } from 'openai/resources/index';

import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openAIModel: OpenAI;

  constructor(private configService: ConfigService) {
    this.openAIModel = new OpenAI({
      apiKey: this.configService.get<string>('AIKEY'),
      organization: this.configService.get<string>('ORGANI_ID'),
      project: this.configService.get<string>('PROJECT_ID'),
    });
  }

  async doInterView(messages: ChatCompletionMessageParam[]): Promise<string> {
    try {
      console.log('AI 작동');
      const completion = await this.openAIModel.chat.completions.create({
        max_tokens: 1500,
        messages: messages,
        model: this.configService.get<string>('INTERVIEWER_AI_ID'),
      });
      const result = completion.choices[0].message.content;
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //   async findAllUsersFeedbacks(): Promise<FeedBack[]> {
  //     return this.FeedBackModel.find().exec();
  //   }
}

@Injectable()
export class FeedBackService {
  constructor(
    @InjectModel(FeedBack.name) private FeedBackModel: Model<FeedBack>,
  ) {}

  async createFeedBack(
    ai: string,
    user: string,
    feedBack: string,
    // userId: string,
    // feedBackId: string,
  ): Promise<FeedBack> {
    try {
      const userId = 99;
      const feedBackId = 99;
      const newUser = new this.FeedBackModel({
        ai,
        user,
        feedBack,
        userId,
        feedBackId,
      });
      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }

  //   async findAllUsersFeedbacks(): Promise<FeedBack[]> {
  //     return this.FeedBackModel.find().exec();
  //   }
}
