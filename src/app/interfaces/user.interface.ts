import { USER_ROLE } from '../enums';

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: USER_ROLE;
  image: string;
  active?: boolean;
  token?: string;
}

export interface IResponseUsers {
  next: string;
  previous?: string;
  count?: number;
  users: IUser[];
}

export interface IUpdateUser {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  repeatPassword?: string;
}
