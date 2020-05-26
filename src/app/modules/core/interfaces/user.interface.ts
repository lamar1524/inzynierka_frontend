import { USER_ROLE } from '../enums';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  role: USER_ROLE;
  image: string;
}
