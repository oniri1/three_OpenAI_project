import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IUserData, IUserAcsToken } from '../../interfaces/i_User';
import { AcsTokenRes } from 'src/interfaces/i_Token';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  acsTokenCreate(userAcs: IUserAcsToken) {
    const acsToken = jwt.sign(
      userAcs,
      this.configService.get<string>('TOKEN_ACS'),
      {
        expiresIn: '10m',
      },
    );

    return acsToken;
  }

  rfsTokenCreate(userData: IUserData) {
    const { id, email, intro, pw, name } = userData;
    const tokenValue = { id, email, intro, pw, name };

    const rfsToken = jwt.sign(
      tokenValue,
      this.configService.get<string>('TOKEN_ACS'),
      {
        expiresIn: '30d',
      },
    );

    return rfsToken;
  }

  acsTokenCheck(acsToken: string, rsfToken: string): AcsTokenRes {
    try {
      const tokenEnv = this.configService.get<string>('TOKEN_ACS');

      if (!tokenEnv) {
        throw 'tokenEnv undefined';
      } else {
        const decoded = jwt.verify(acsToken, tokenEnv) as IUserAcsToken;

        const result = {
          email: decoded.email,
          reAcsToken: false,
        } as AcsTokenRes;

        return result;
      }
    } catch (err) {
      try {
        const tokenEnv = this.configService.get<string>('TOKEN_RFS');

        const decoded = jwt.verify(rsfToken, tokenEnv) as IUserData;

        const result = {
          email: decoded.email,
          reAcsToken: true,
        } as AcsTokenRes;

        return result;
      } catch (err) {
        throw err;
      }
    }
  }
}
