import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTES } from '../../../../consts';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
  messages: [string, string];

  constructor() {
    this.messages = ['Paweł Młynarski', 'Andrzej działowy'];
  }

  get routes() {
    return ROUTES;
  }
}
