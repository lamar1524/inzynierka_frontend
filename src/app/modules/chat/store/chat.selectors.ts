import { createSelector } from '@ngrx/store';

import { ChatModuleState, ChatState } from './chat.reducer';

export const selectChat = (state: ChatModuleState) => state.chat;

export const selectThreadsLoading = createSelector(selectChat, (state: ChatState) => state.threadsLoading);
export const selectThreads = createSelector(selectChat, (state: ChatState) => state.threads);

export const selectMessagesLoading = createSelector(selectChat, (state: ChatState) => state.messagesLoading);
export const selectMessages = createSelector(selectChat, (state: ChatState) => state.messages);
