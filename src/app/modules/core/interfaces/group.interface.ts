import { IUser } from './user.interface';

export interface IGroup {
  id: number;
  name: string;
  owner: IUser;
  moderator?: IUser;
  image: string;
  members: IUser[];
  members_count?: number;
}

export interface IBaseGroup {
  id: number;
  name: string;
  owner?: number;
  moderator?: number;
}

export interface IResponseGroups {
  next: string;
  previous?: string;
  groups: IGroup[];
}
