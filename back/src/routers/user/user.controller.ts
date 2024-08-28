import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { IUserUpdate, IUserData } from 'src/interfaces/i_User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check')
  async userCheck(@Req() req: Request, @Res() res: Response) {
    console.log('get/user/check');
    try {
      const userData = await this.userService.userCheck(req.session?.userData);
      if (!userData) {
        console.log('세션없음');
        res.status(HttpStatus.NO_CONTENT).send();
      } else {
        res.status(HttpStatus.OK).send();
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  @Patch('update')
  async userCreate(@Req() req: Request, @Res() res: Response) {
    console.log('Patch/user/update');
    try {
      const userReq: IUserUpdate = req.body;

      const userData = await this.userService.userCheck(req.session?.userData);
      if (!userData) {
        console.log('유저 생성 시작');
        const userSession = await this.userService.userCreate(userReq);
        req.session.userData = userSession;
        res.status(HttpStatus.CREATED).json();
      } else {
        console.log('세션 데이터 있음');
        const userSession = await this.userService.userUpdate(
          userData as IUserData,
        );
        req.session.userData = userSession;
        res.status(HttpStatus.OK).json();
      }
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }
}
