import { createReducer, on, Action } from '@ngrx/store';
import { IResponseMessages, IThread } from '../../../interfaces/message.interface';

import { LAST_MESSAGE_TYPE } from '../../../enums/last-message-name.enum';
import * as chatActions from './chat.actions';

export interface ChatModuleState {
  chat: ChatState;
}

export interface ChatState {
  threadsLoading: boolean;
  messagesLoading: boolean;
  threads: IThread[];
  messages: IResponseMessages;
}

export const initialState: ChatState = {
  threadsLoading: false,
  messagesLoading: false,
  threads: [],
  messages: null,
};

export const CHAT_REDUCER = createReducer(
  initialState,
  on(chatActions.loadThreads, (state: ChatState) => ({ ...state, threadsLoading: true })),
  on(chatActions.loadThreadsSuccess, (state: ChatState, { threads }) => ({ ...state, threadsLoading: false, threads })),
  on(chatActions.loadThreadsFail, (state: ChatState) => ({ ...state, threadsLoading: false })),

  on(chatActions.loadMessages, (state: ChatState) => ({ ...state, messagesLoading: true })),
  on(chatActions.loadMessagesSuccess, (state: ChatState, { messages }) => ({
    ...state,
    messagesLoading: false,
    messages: { ...messages, type: LAST_MESSAGE_TYPE.GROUP },
  })),
  on(chatActions.loadMessagesFail, (state: ChatState) => ({ ...state, messagesLoading: false })),

  on(chatActions.pushMessage, (state: ChatState, { message }) => ({
    ...state,
    messages: { ...state.messages, results: [...state.messages.results, message], type: LAST_MESSAGE_TYPE.SINGLE },
  })),

  on(chatActions.clearChat, (state: ChatState) => ({ ...state, messages: null })),
);

export const chatReducer = (state: ChatState | undefined, action: Action) => CHAT_REDUCER(state, action);
