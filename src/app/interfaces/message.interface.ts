import { IUser } from './user.interface';

export interface IThread {
  user1: IUser;
  user2: IUser;
}

export interface IMessage {
  thread: IThread;
  content: string;
  sender: number;
  dateSend: Date;
}
