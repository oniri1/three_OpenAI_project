import {
  Controller,
  Post,
  Body,
  Res,
  Session,
  HttpStatus,
} from '@nestjs/common';
import { AiService, FeedBackService } from './ai.service';
import { FeedBack } from './mongoDB/feedback.schema';
import { ChatCompletionMessageParam } from 'openai/resources/index';
import { SessionData } from 'express-session';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { IUserData } from 'src/interfaces/i_User';
import { IFeedBacks, IFeedBackSave } from 'src/interfaces/i_Ai';

@Controller('ai')
export class AiController {
  constructor(
    private readonly feedBackService: FeedBackService,
    private readonly aiService: AiService,
    private readonly userService: UserService,
  ) {}

  @Post('doInterView')
  async doInterView(
    @Body('ai') ai: string,
    @Body('user') user: string,
    @Session() session: SessionData,
    @Res() res: Response,
  ) {
    try {
      const userData: IUserData = session?.userData;
      const interViewMSGDefault: ChatCompletionMessageParam = {
        role: 'system',
        content:
          '당신은 면접관 역할을 맡고 있으며, 지원자에게 질문하고 그 답변을 평가합니다.',
      };
      const interViewMsg: ChatCompletionMessageParam[] = [interViewMSGDefault];

      //유저 인트로 넣는 파트
      const userCheck = await this.userService.userCheck(userData);
      if (!userCheck) {
        res.status(HttpStatus.NO_CONTENT).send();
        return;
      } else {
        const { intro } = userCheck as IUserData;
        const userMsg: ChatCompletionMessageParam = {
          role: 'user',
          content: intro,
        };

        interViewMsg.push(userMsg);
      }
      //클라이언트 입력값 파트
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
        console.log('입력 데이터 없음', ai, user);
      }
      console.log('작동 시작');

      res.json({ msg: await this.aiService.doInterView(interViewMsg) });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Post('feedBackSave')
  async feedBackSave(
    @Body('feedBacks') saveValues: IFeedBackSave[],
    @Session() session: SessionData,
    @Res() res: Response,
  ): Promise<FeedBack> {
    try {
      const userData: IUserData = session?.userData;

      const userCheck = await this.userService.userCheck(userData);
      if (!userCheck) {
        res.status(HttpStatus.NO_CONTENT).send();
        return;
      } else {
        if (saveValues.length === 0) {
          res.status(HttpStatus.NO_CONTENT).send();
          return;
        }
        if (userCheck instanceof Boolean) {
          return;
        }
      }

      const { id } = userCheck as IUserData;

      console.log(saveValues, id);

      await this.feedBackService.createFeedBacks({
        saveValues: saveValues,
        userId: id,
      });

      res.status(201).json();

      //response 추가 예정
    } catch (err) {
      throw new Error(err);
    }
  }

  // @Post('test')
  // async aiTest() {
  //   const ai = '당신에 대해 설명해 주시겠어요?';
  //   const user = '저는 IT 기업에 입사하기 위해 자바스크립트를 공부했습니다.';
  //   const userReq =
  //     user + '이 대답이 적절한가요? 어떻게 대답하면 좋을지 피드백을 해줘';

  //   const interViewMSGDefault: ChatCompletionMessageParam = {
  //     role: 'system',
  //     content:
  //       '당신은 다음 내용에 대해 틀린점을 지적하며, 다음번에는 어떻게 대답하면 좋을지에 대해 피드백 합니다.',
  //   };
  //   const interViewMsg: ChatCompletionMessageParam[] = [interViewMSGDefault];

  //   const aiMsg: ChatCompletionMessageParam = {
  //     role: 'assistant',
  //     content: ai,
  //   };

  //   const userMsg: ChatCompletionMessageParam = {
  //     role: 'user',
  //     content: userReq,
  //   };

  //   interViewMsg.push(aiMsg);
  //   interViewMsg.push(userMsg);

  //   console.log(interViewMsg);

  //   this.feedBackService.aiDoWork({ messages: interViewMsg });

  //   return 'hi';
  // }

  //   @Get()
  //   async findAllUsers(): Promise<FeedBack[]> {
  //     return this.feedBackService.findAllUsersFeedbacks();
  //   }
}
