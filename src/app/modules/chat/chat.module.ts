import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { STORE_FEATURES } from '@core/consts';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './components';
import { chatReducer, ChatEffects } from './store';

@NgModule({
  declarations: [ChatListComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.chat, chatReducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
})
export class ChatModule {}
