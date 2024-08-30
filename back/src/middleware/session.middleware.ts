import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as FileStore from 'session-file-store';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    const sessionKey = this.configService.get<string>('SESSION_KEY');
    if (sessionKey) {
      const FileStoreSession = FileStore(session);
      session({
        secret: sessionKey,
        resave: false,
        saveUninitialized: true,
        name: 'userData',
        store: new FileStoreSession({
          reapInterval: 1000,
          path: './session',
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 30,
        },
      })(req, res, next);
    } else {
      throw new Error('sessionKey Missed');
    }
  }
}
