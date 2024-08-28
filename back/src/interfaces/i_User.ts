interface UserBase {
  name: string;
  email: string;
  intro: string;
}

export interface IUserData extends UserBase {
  id: number;
}

export interface IUserUpdate extends UserBase {}
