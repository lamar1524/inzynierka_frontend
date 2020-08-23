import { IUser } from './user.interface';

export interface IResponseThreads {
  previous?: string;
  next?: string;
  results: IThread;
}

export interface IThread {
  id?: number;
  lastMessage: IMessage;
  user1: IUser;
  user2: IUser;
}

export interface IResponseMessages {
  previous?: string;
  next?: string;
  results: IMessage[];
}

export interface IMessage {
  thread: number;
  content: string;
  sender: IUser;
  dateSend: Date;
}
