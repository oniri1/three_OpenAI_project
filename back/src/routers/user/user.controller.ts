import { Controller, Get, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check')
  async userCheck(@Req() req: Request, @Res() res: Response) {
    console.log('get/user/check');
    try {
      if (!(await this.userService.userCheck(req.session.userData?.id))) {
        console.log('세션없음');
        res.status(HttpStatus.NO_CONTENT).send();
      } else {
        //추가 로직 필요
        console.log('있음');
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }

  @Post('create')
  async userCreate(@Req() req: Request, @Res() res: Response) {
    console.log('post/user/create');
    try {
      res.status(HttpStatus.CREATED).json(await this.userService.userCreate());
    } catch (err) {
      res.status(HttpStatus.FORBIDDEN).json(err);
    }
  }
}
