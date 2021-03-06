import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgScrollbarModule } from 'ngx-scrollbar';

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
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgScrollbarModule,
    InfiniteScrollModule,
  ],
})
export class ChatModule {}
