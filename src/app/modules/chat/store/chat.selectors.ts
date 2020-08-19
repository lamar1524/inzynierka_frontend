import { ChatModuleState } from './chat.reducer';

export const selectChat = (state: ChatModuleState) => state.chat;
