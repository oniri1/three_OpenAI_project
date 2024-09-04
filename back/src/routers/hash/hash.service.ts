import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  async doHash(value: string) {
    try {
      const salt = this.configService.get<string>('SALT');

      if (salt === undefined) {
        throw 'salt undefined';
      }

      const pbkdf2 = crypto.pbkdf2Sync(value, salt, 5, 8, 'sha256');

      return pbkdf2.toString('hex');
    } catch (err) {
      throw err;
    }
  }
}
