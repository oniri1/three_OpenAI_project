import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedBack } from './mongoDB/feedback.schema';

import { ConfigService } from '@nestjs/config';
import { ChatCompletionMessageParam } from 'openai/resources/index';

import OpenAI from 'openai';
import { IFeedBacks, IFeedBackSave } from 'src/interfaces/i_Ai';

@Injectable()
export class FeedBackService {
  private openAIModel: OpenAI;

  constructor(
    @InjectModel(FeedBack.name) private FeedBackModel: Model<FeedBack>,
    private configService: ConfigService,
  ) {
    this.openAIModel = new OpenAI({
      apiKey: this.configService.get<string>('AIKEY'),
      organization: this.configService.get<string>('ORGANI_ID'),
      project: this.configService.get<string>('PROJECT_ID'),
    });
  }

  //
  async createFeedBacks({
    saveValues,
    userId,
  }: {
    saveValues: IFeedBackSave[];
    userId: number;
  }) {
    try {
      const feedBackId = await this.FeedBackModel.countDocuments({
        userId,
      }).exec();

      //saveValues 를 FeedBacks로 변환
      const feedBacks = await this.feedBacksMaker(saveValues);

      //토탈 피드백 벨류
      const totalValues: string[] = [];
      for (const { feedBack } of feedBacks) {
        totalValues.push(feedBack);
      }
      const totalValue =
        '다음과 같은 피드백을 받았습니다 : ' +
        totalValues.join() +
        ', 이 피드백들을 토대로 나에게 어떤 문제들이 있는지 답변해주세요. 그리고 마지막이 ? 로 끝나는 대답은 하지말아주세요.';

      console.log(totalValue);
      //토탈 피드백 만들기
      const totalFeedBack = await this.totalFeedBackMaker(totalValue);

      const newFeedBack = new this.FeedBackModel({
        totalFeedBack,
        feedBacks,
        userId,
        feedBackId,
      });

      return await newFeedBack.save();
    } catch (err) {
      throw err;
    }
  }

  async feedBacksMaker(saveValues: IFeedBackSave[]): Promise<IFeedBacks[]> {
    try {
      const result: IFeedBacks[] = [];

      for (const { ai, user } of saveValues) {
        if (!(ai && user)) {
          throw 'Data Error at FeedBackMaker';
        }

        //유저 대답에 대한 피드백용
        const userReq =
          user +
          '이 대답이 적절한가요? 어떻게 대답하면 좋을지 피드백을 해주세요. 그리고 질문 형식으로 끝내는 대답은 하지말아주세요.';

        //ai 셋팅
        const interViewMSGDefault: ChatCompletionMessageParam = {
          role: 'system',
          content:
            '당신은 다음 내용에 대해 틀린점을 지적하며, 다음번에는 어떻게 대답하면 좋을지에 대해 설명 합니다.',
        };
        //인자로 넘겨줄 대화의 집합
        const interViewMsg: ChatCompletionMessageParam[] = [
          interViewMSGDefault,
        ];
        const aiMsg: ChatCompletionMessageParam = {
          role: 'assistant',
          content: ai,
        };
        const userMsg: ChatCompletionMessageParam = {
          role: 'user',
          content: userReq,
        };

        interViewMsg.push(aiMsg);
        interViewMsg.push(userMsg);

        const feedBack: string = await this.aiDoWork({
          messages: interViewMsg,
        });

        result.push({ ai, user, feedBack });
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  async totalFeedBackMaker(msg: string): Promise<string> {
    try {
      //ai 셋팅
      const interViewMSGDefault: ChatCompletionMessageParam = {
        role: 'system',
        content: '당신은 유저의 내용에서 핵심만을 간단하게 요약합니다.',
      };
      //인자로 넘겨줄 대화의 집합
      const interViewMsg: ChatCompletionMessageParam[] = [interViewMSGDefault];

      const userMsg: ChatCompletionMessageParam = {
        role: 'user',
        content: msg,
      };

      interViewMsg.push(userMsg);

      return await this.aiDoWork({
        messages: interViewMsg,
      });
    } catch (err) {
      throw err;
    }
  }

  async aiDoWork({
    messages,
  }: {
    messages: ChatCompletionMessageParam[];
  }): Promise<string> {
    const completion = await this.openAIModel.chat.completions.create({
      max_tokens: 1500,
      messages: messages,
      model: this.configService.get<string>('INTERVIEWER_AI_ID'),
    });
    const result = completion.choices[0].message.content;

    console.log(result);

    return result;
  }
}

//Ai서비스
@Injectable()
export class AiService {
  constructor(
    private configService: ConfigService,
    private readonly feedBackService: FeedBackService,
  ) {}

  async doInterView(messages: ChatCompletionMessageParam[]): Promise<string> {
    try {
      console.log('AI 작동');

      return this.feedBackService.aiDoWork({ messages: messages });
    } catch (err) {
      throw err;
    }
  }
}
