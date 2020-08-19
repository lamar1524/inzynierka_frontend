import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './components';

@NgModule({
  declarations: [ChatListComponent],
  imports: [CommonModule, ChatRoutingModule],
})
export class ChatModule {}
