import { Controller, Get, Post, Body } from '@nestjs/common';
import { AiService, FeedBackService } from './ai.service';
import { FeedBack } from './mongoDB/feedback.schema';
import { ChatCompletionMessageParam } from 'openai/resources/index';

@Controller('ai')
export class AiController {
  constructor(
    private readonly feedBackService: FeedBackService,
    private readonly aiService: AiService,
  ) {}

  @Post('doInterView')
  async doInterView(@Body('ai') ai: string, @Body('user') user: string) {
    try {
      console.log(ai, user);

      const interViewMSGDefault: ChatCompletionMessageParam = {
        role: 'system',
        content:
          '당신은 면접관 역할을 맡고 있으며, 지원자에게 질문하고 그 답변을 평가합니다.',
      };
      const interViewMsg: ChatCompletionMessageParam[] = [interViewMSGDefault];

      if (ai && user) {
        const aiMsg: ChatCompletionMessageParam = {
          role: 'assistant',
          content: ai,
        };

        const userMsg: ChatCompletionMessageParam = {
          role: 'user',
          content: user,
        };

        interViewMsg.push(aiMsg);
        interViewMsg.push(userMsg);

        console.log('유저 데이터 변환 성공', interViewMsg);
      } else {
        console.log('데이터 빔', ai, user);
      }
      console.log('작동 시작');

      return this.aiService.doInterView(interViewMsg);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('feedBackSave')
  async feedBackSave(
    @Body('ai') ai: string,
    @Body('user') user: string,
    @Body('feedBack') feedBack: string,
  ): Promise<FeedBack> {
    try {
      console.log(ai, user, feedBack);
      return await this.feedBackService.createFeedBack(ai, user, feedBack);
    } catch (err) {
      throw new Error(err);
    }
  }

  //   @Get()
  //   async findAllUsers(): Promise<FeedBack[]> {
  //     return this.feedBackService.findAllUsersFeedbacks();
  //   }
}
