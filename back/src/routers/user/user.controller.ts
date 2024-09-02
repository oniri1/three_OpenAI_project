import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import {
  IUserUpdate,
  IUserData,
  IUserCreate,
  IUserLogin,
} from 'src/interfaces/i_User';

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
        res.status(HttpStatus.OK).json(userData);
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Get('feedBacks')
  async userFeedBacks(@Req() req: Request, @Res() res: Response) {
    console.log('get/user/feedBacks');
    try {
      const userData: IUserData = req.session?.userData;

      const userCheck = await this.userService.userCheck(userData);
      if (!userCheck) {
        res.status(HttpStatus.NO_CONTENT).send();
        return;
      } else {
        const { id } = userCheck as IUserData;
        const getFeedBacks = await this.userService.userFeedBacksGet(id);

        const { feedBacks, totalFeedBack } = getFeedBacks;

        res.status(200).json({ feedBacks, totalFeedBack });
      }
    } catch (err) {
      res.status(403).json(err);
    }
  }

  @Patch('update')
  async userUpdate(@Req() req: Request, @Res() res: Response) {
    console.log('patch/user/update');
    try {
      const userReq: IUserUpdate = req.body;

      const userData = await this.userService.userCheck(req.session?.userData);
      if (!userData) {
        throw 'you are disabled';
      } else {
        const { id } = userData as IUserData;
        const { name, email, intro, pw } = userReq;

        const userSession = await this.userService.userUpdate({
          id,
          name,
          email,
          intro,
          pw,
        });

        req.session.userData = userSession;
        res.status(HttpStatus.OK).json();
      }
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  //새로 추가
  @Post('regist')
  async userCreate(@Req() req: Request, @Res() res: Response) {
    console.log('post/user/regist');
    try {
      const userReq: IUserCreate = req.body;

      const userSession = await this.userService.userCreate(userReq);
      req.session.userData = userSession;
      res.status(HttpStatus.CREATED).json();
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  @Post('login')
  async userlogin(@Req() req: Request, @Res() res: Response) {
    console.log('post/user/login');
    try {
      const userReq: IUserLogin = req.body;

      const userSession = await this.userService.userLogin(userReq);
      req.session.userData = userSession;
      res.status(HttpStatus.OK).json();
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }
}
