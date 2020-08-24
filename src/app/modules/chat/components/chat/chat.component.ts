import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthModuleState } from '@authorization/store';
import * as authSelectors from '@authorization/store/authorization.selectors';
import { ChatService } from '@core/services';
import { IUser } from '../../../../interfaces';
import { IMessage } from '../../../../interfaces/message.interface';
import { chatActions, chatSelectors, ChatModuleState } from '../../store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnDestroy {
  private _threadId;
  private _sub$: Subscription;
  private _currentUser: IUser;

  messages$: Observable<IMessage[]>;
  messagesLoading$: Observable<boolean>;
  messageSubmitForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<ChatModuleState | AuthModuleState>,
    private chatService: ChatService,
  ) {
    this._sub$ = new Subscription();
    const route$ = this.activatedRoute.params.subscribe((params) => {
      this._threadId = params.id;
      this.store.dispatch(chatActions.loadMessages({ url: null, threadId: this._threadId }));
    });
    this._sub$.add(route$);
    this.messages$ = this.store.select(chatSelectors.selectMessages);
    this.messagesLoading$ = this.store.select(chatSelectors.selectMessagesLoading);

    this.messageSubmitForm = new FormGroup({
      content: new FormControl(null, Validators.required),
    });
    this.chatService.createChatSocket(1);
    const chat$ = this.chatService.chatSocket$.subscribe((message) => {
      console.log(message);
    });
    this._sub$.add(chat$);
    const currentUser$ = this.store.select(authSelectors.selectCurrentUser).subscribe((user) => {
      this._currentUser = user;
    });
    this._sub$.add(currentUser$);
  }

  get content() {
    return this.messageSubmitForm.get('content');
  }

  handleMessageSubmit() {
    this.chatService.sendMessage({ message: 'Hamlo', senderId: this._currentUser.id });
  }

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
    this.chatService.closeSocketConnection();
  }
}
