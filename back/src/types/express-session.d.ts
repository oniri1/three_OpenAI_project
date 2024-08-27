import 'express-session';
import { IUser } from 'src/interfaces/i_User';

declare module 'express-session' {
  interface SessionData {
    userData?: IUser;
  }
}
