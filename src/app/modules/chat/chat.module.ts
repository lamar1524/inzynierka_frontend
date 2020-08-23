import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { STORE_FEATURES } from '../../consts';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './components';
import { ChatComponent } from './components/chat/chat.component';
import { chatReducer, ChatEffects } from './store';

@NgModule({
  declarations: [ChatListComponent, ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.chat, chatReducer),
    EffectsModule.forFeature([ChatEffects]),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ChatModule {}
