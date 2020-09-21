import { LAST_MESSAGE_TYPE } from '../enums/last-message-name.enum';
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
  type?: LAST_MESSAGE_TYPE;
}

export interface IMessage {
  id?: number;
  thread: number;
  content: string;
  sender: IUser;
  dateSend: Date;
}
