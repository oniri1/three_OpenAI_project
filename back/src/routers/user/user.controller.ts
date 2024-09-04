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
import { TokenService } from '../token/token.service';
import { HashService } from '../hash/hash.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
  ) {}

  @Get('check')
  async userCheck(@Req() req: Request, @Res() res: Response) {
    console.log('get/user/check');
    try {
      if (req.session.userData || req.cookies.rsfToken) {
        const refreshToken = req.cookies.rsfToken;

        const acsTokenDecoded = this.tokenService.acsTokenCheck(
          req.session.userData,
          refreshToken,
        );

        const userData = await this.userService.userCheck(acsTokenDecoded);

        console.log(userData);

        if (!userData) {
          throw 'not found user';
        } else {
          const { email } = userData as IUserData;

          if (acsTokenDecoded.reAcsToken) {
            const acsToken = this.tokenService.acsTokenCreate({ email: email });
            req.session.userData = acsToken;
          }

          res.status(HttpStatus.OK).json(userData);
        }
      } else {
        throw 'no Token';
      }
    } catch (err) {
      console.log(err);
      req.session.userData = undefined;
      res.cookie('rsfToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // 과거 날짜로 설정하여 즉시 삭제
      });
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Get('feedBacks')
  async userFeedBacks(@Req() req: Request, @Res() res: Response) {
    console.log('get/user/feedBacks');
    try {
      if (req.session.userData || req.cookies.rsfToken) {
        const refreshToken = req.cookies.rsfToken;

        const acsTokenDecoded = this.tokenService.acsTokenCheck(
          req.session.userData,
          refreshToken,
        );

        const userCheck = await this.userService.userCheck(acsTokenDecoded);
        if (!userCheck) {
          throw 'userCheck undefined';
        } else {
          const { id, email } = userCheck as IUserData;
          const getFeedBacks = await this.userService.userFeedBacksGet(id);

          const result = getFeedBacks.map(({ feedBackId, totalFeedBack }) => {
            return { feedBackId, totalFeedBack };
          });

          if (acsTokenDecoded.reAcsToken) {
            const acsToken = this.tokenService.acsTokenCreate({ email: email });
            req.session.userData = acsToken;
          }

          res.status(200).json(result);
        }
      } else {
        throw 'not Token';
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Post('feedBack')
  async userFeedBack(@Req() req: Request, @Res() res: Response) {
    console.log('post/user/feedBack');
    try {
      if (req.session.userData || req.cookies.rsfToken) {
        const refreshToken = req.cookies.rsfToken;

        const acsTokenDecoded = this.tokenService.acsTokenCheck(
          req.session.userData,
          refreshToken,
        );

        const userCheck = await this.userService.userCheck(acsTokenDecoded);
        if (!userCheck) {
          throw 'userCheck undefined';
        } else {
          const { id, email } = userCheck as IUserData;
          const { feedBackId }: { feedBackId: number } = req.body;
          const getFeedBacks = await this.userService.userFeedBackGet(
            id,
            feedBackId,
          );

          const { feedBacks } = getFeedBacks;

          if (acsTokenDecoded.reAcsToken) {
            const acsToken = this.tokenService.acsTokenCreate({ email: email });
            req.session.userData = acsToken;
          }

          res.status(200).json(feedBacks);
        }
      } else {
        throw 'not Token';
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Patch('update')
  async userUpdate(@Req() req: Request, @Res() res: Response) {
    console.log('patch/user/update');
    try {
      if (req.session.userData) {
        const userReq: IUserUpdate = req.body;
        const refreshToken = req.cookies.rsfToken;

        const acsTokenDecoded = this.tokenService.acsTokenCheck(
          req.session.userData,
          refreshToken,
        );

        const userData = await this.userService.userCheck(acsTokenDecoded);

        if (!userData) {
          throw 'you are disabled';
        } else {
          const { id } = userData as IUserData;
          const { name, email, intro, pw } = userReq;

          const userDatas = await this.userService.userUpdate({
            id,
            name,
            email,
            intro,
            pw,
          });

          const acsToken = this.tokenService.acsTokenCreate({ email: email });
          const rsfToken = this.tokenService.rfsTokenCreate(userDatas);
          req.session.userData = acsToken;
          res.cookie('rsfToken', rsfToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
          });

          res.status(HttpStatus.OK).json();
        }
      } else {
        throw 'you are not login';
      }
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  @Post('regist')
  async userCreate(@Req() req: Request, @Res() res: Response) {
    console.log('post/user/regist');
    try {
      const userReq: IUserCreate = req.body;

      const userDatas = await this.userService.userCreate(userReq);

      const { email } = userDatas;

      const acsToken = this.tokenService.acsTokenCreate({ email: email });
      const rsfToken = this.tokenService.rfsTokenCreate(userDatas);

      req.session.userData = acsToken;
      res.cookie('rsfToken', rsfToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      res.status(HttpStatus.CREATED).json();
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  @Post('login')
  async userlogin(@Req() req: Request, @Res() res: Response) {
    console.log('post/user/login');
    try {
      const userReq: IUserLogin = req.body;

      const userDatas = await this.userService.userLogin(userReq);

      const { email } = userDatas;

      const acsToken = this.tokenService.acsTokenCreate({ email: email });
      const rsfToken = this.tokenService.rfsTokenCreate(userDatas);

      req.session.userData = acsToken;
      res.cookie('rsfToken', rsfToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      res.status(HttpStatus.OK).json();
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  @Get('logout')
  userLogout(@Req() req: Request, @Res() res: Response) {
    console.log('get/user/logout');
    req.session.userData = undefined;
    res.cookie('rsfToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(0), // 과거 날짜로 설정하여 즉시 삭제
    });
    res.status(HttpStatus.OK).json();
  }
}
