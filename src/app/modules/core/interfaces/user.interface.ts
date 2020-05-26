import { USER_ROLE } from '../enums';

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: USER_ROLE;
  image: string;
  token?: string;
}
