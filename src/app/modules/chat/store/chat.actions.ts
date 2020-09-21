import { createAction, props } from '@ngrx/store';
import { IMessage } from '../../../interfaces/message.interface';

export const loadThreads = createAction('[Chat] Load threads', props<{ url: string | null }>());
export const loadThreadsSuccess = createAction('[Chat] Load threads success', props<{ threads: any }>());
export const loadThreadsFail = createAction('[Chat] Load threads fail');

export const loadMessages = createAction('[Chat] Load messages', props<{ url: string | null; threadId: number | null }>());
export const loadMessagesSuccess = createAction('[Chat] Load messages success', props<{ messages: any }>());
export const loadMessagesFail = createAction('[Chat] Load messages fail');

export const pushMessage = createAction('[Chat] Push message', props<{ message: IMessage }>());

export const clearChat = createAction('[Chat] Clear chat');
