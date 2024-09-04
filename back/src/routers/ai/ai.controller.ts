import {
  Controller,
  Post,
  Body,
  Res,
  Session,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AiService, FeedBackService } from './ai.service';
import { FeedBack } from './mongoDB/feedback.schema';
import { ChatCompletionMessageParam } from 'openai/resources/index';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';
import { IUserData } from 'src/interfaces/i_User';
import { IFeedBackSave } from 'src/interfaces/i_Ai';
import { TokenService } from '../token/token.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly feedBackService: FeedBackService,
    private readonly aiService: AiService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('doInterView')
  async doInterView(
    @Body('ai') ai: string,
    @Body('user') user: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('post/ai/doInterView');
    try {
      if (req.session.userData || req.cookies.rsfToken) {
        const refreshToken = req.cookies.rsfToken;

        const acsTokenDecoded = this.tokenService.acsTokenCheck(
          req.session.userData,
          refreshToken,
        );

        const interViewMSGDefault: ChatCompletionMessageParam = {
          role: 'system',
          content:
            '당신은 면접관 역할을 맡고 있으며, 지원자에게 질문하고 그 답변을 평가합니다.',
        };
        const interViewMsg: ChatCompletionMessageParam[] = [
          interViewMSGDefault,
        ];

        //유저 인트로 넣는 파트
        const userCheck = await this.userService.userCheck(acsTokenDecoded);
        if (!userCheck) {
          throw 'userCheck err';
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
        } else {
          console.log('입력 데이터 없음', ai, user);
        }

        res.json({ msg: await this.aiService.doInterView(interViewMsg) });
      } else {
        throw 'not Token';
      }
    } catch (err) {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Post('feedBackSave')
  async feedBackSave(
    @Body('feedBacks') saveValues: IFeedBackSave[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('post/ai/feedBackSave');
    try {
      if (req.session.userData || req.cookies.rsfToken) {
        const refreshToken = req.cookies.rsfToken;

        const acsTokenDecoded = this.tokenService.acsTokenCheck(
          req.session.userData,
          refreshToken,
        );

        const userCheck = await this.userService.userCheck(acsTokenDecoded);
        if (!userCheck) {
          throw 'userCheck Err';
        } else {
          if (saveValues.length === 0) {
            throw 'not found saves data';
          }
        }

        const { id } = userCheck as IUserData;

        const saved = await this.feedBackService.createFeedBacks({
          saveValues: saveValues,
          userId: id,
        });

        console.log('세이브된 피드백', saved);

        res.status(201).json();
      } else {
        throw 'not Token';
      }
    } catch (err) {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
