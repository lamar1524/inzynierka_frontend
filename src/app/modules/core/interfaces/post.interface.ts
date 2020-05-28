import { IBaseGroup } from './group.interface';
import { IUser } from './user.interface';

export interface IPost {
  id: number;
  content: string;
  owner: IUser;
  group: IBaseGroup;
  date_posted: Date;
  image?: string;
  file?: string;
  comments: IComment[];
}

export interface IResponsePosts {
  next: string;
  posts: IPost[];
}

export interface IComment {
  owner: IUser;
  content: string;
  date_commented: Date;
  post: number;
}
