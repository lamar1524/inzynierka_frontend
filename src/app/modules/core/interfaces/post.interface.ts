import { IBaseGroup } from './group.interface';
import { IUser } from './user.interface';

export interface IPost {
  id?: number;
  content: string;
  owner?: IUser;
  group?: IBaseGroup;
  date_posted?: Date;
  image?: string | File;
  file?: string | File;
  comments?: IComment[];
}

export interface IResponsePosts {
  next: string;
  previous?: string;
  posts: IPost[];
}

export interface IComment {
  id?: number;
  owner: IUser;
  content: string;
  date_commented: Date;
  post: number;
}

export interface IResponseComments {
  next: string;
  previous?: string;
  comments: IComment[];
}
