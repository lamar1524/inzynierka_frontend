import { createSelector } from '@ngrx/store';

import { ChatModuleState, ChatState } from './chat.reducer';

export const selectChat = (state: ChatModuleState) => state.chat;

export const selectThreadsLoading = createSelector(selectChat, (state: ChatState) => state.threadsLoading);
export const selectMessagesLoading = createSelector(selectChat, (state: ChatState) => state.messagesLoading);
