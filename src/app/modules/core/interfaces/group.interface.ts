import { IUser } from './user.interface';

export interface IGroup {
  id: number;
  name: string;
  owner: IUser;
  moderator: IUser;
  image: string;
  members: IUser[];
}

export interface IBaseGroup {
  id: number;
  name: string;
}

export interface IResponseGroups {
  next: string;
  groups: IGroup[];
}
