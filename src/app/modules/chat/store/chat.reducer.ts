import { createReducer, on, Action } from '@ngrx/store';
import { IMessage, IThread } from '../../../interfaces/message.interface';

import * as chatActions from './chat.actions';

export interface ChatModuleState {
  chat: ChatState;
}

export interface ChatState {
  threadsLoading: boolean;
  messagesLoading: boolean;
  threads: IThread[];
  messages: IMessage[];
}

export const initialState: ChatState = {
  threadsLoading: false,
  messagesLoading: false,
  threads: [],
  messages: [],
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
    messages: state.messages.length > 0 ? [...messages, ...state.messages] : [...messages],
  })),
  on(chatActions.loadMessagesFail, (state: ChatState) => ({ ...state, messagesLoading: false })),

  on(chatActions.pushMessage, (state: ChatState, { message }) => ({ ...state, messages: [...state.messages, message] })),

  on(chatActions.clearChat, (state: ChatState) => ({ ...state, messages: [] })),
);

export const chatReducer = (state: ChatState | undefined, action: Action) => CHAT_REDUCER(state, action);
