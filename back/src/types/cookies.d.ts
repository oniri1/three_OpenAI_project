import * as express from 'express';

declare module 'express' {
  interface Request {
    cookies: {
      rsfToken?: string;
      userData?: string;
    };
  }
}
