export interface IUser {
  id: number;
  name: string;
  email: string;
  intro: string;
}

export interface IGetUserDatas {
  data?: IUser;
  status: number;
}
