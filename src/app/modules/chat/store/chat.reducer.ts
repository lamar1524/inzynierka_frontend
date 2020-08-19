import { createReducer, on, Action } from '@ngrx/store';

import * as chatActions from './chat.actions';

export interface ChatModuleState {
  chat: ChatState;
}

export interface ChatState {
  threadsLoading: boolean;
}

export const initialState: ChatState = {
  threadsLoading: false,
};

export const CHAT_REDUCER = createReducer(
  initialState,
  on(chatActions.loadThreads, (state: ChatState) => ({ ...state, threadsLoading: true })),
  on(chatActions.loadThreadsSuccess, (state: ChatState) => ({ ...state, threadsLoading: false })),
  on(chatActions.loadThreadsFail, (state: ChatState) => ({ ...state, threadsLoading: false })),
);

export const chatReducer = (state: ChatState | undefined, action: Action) => CHAT_REDUCER(state, action);
