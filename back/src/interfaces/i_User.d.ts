interface UserBase {
  name: string;
  email: string;
  pw: string | undefined;
  intro: string;
}

export interface IUserData extends UserBase {
  id: number;
}

export interface IUserUpdate extends UserBase {}

export interface IUserCreate extends UserBase {}

export interface IUserLogin {
  email: string;
  pw: string;
}

export interface IUserAcsToken {
  email: string;
}
