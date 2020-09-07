import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthModuleState } from '@authorization/store';
import * as authSelectors from '@authorization/store/authorization.selectors';
import { ChatService } from '@core/services';
import { filter } from 'rxjs/operators';
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

  currentUser: IUser;
  messages: IMessage[];
  messagesLoading$: Observable<boolean>;
  messageSubmitForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<ChatModuleState | AuthModuleState>,
    private chatService: ChatService,
    private cdRef: ChangeDetectorRef,
  ) {
    this._sub$ = new Subscription();
    const currentUser$ = this.store
      .select(authSelectors.selectCurrentUser)
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.currentUser = user;
        this.cdRef.markForCheck();
      });
    this._sub$.add(currentUser$);
    const route$ = this.activatedRoute.params.subscribe((params) => {
      this._threadId = params.id;
      this.store.dispatch(chatActions.loadMessages({ url: null, threadId: this._threadId }));
    });
    this._sub$.add(route$);
    const messages$ = this.store.select(chatSelectors.selectMessages).subscribe((messages) => {
      this.messages = [...messages];
      this.cdRef.markForCheck();
    });
    this._sub$.add(messages$);
    this.messagesLoading$ = this.store.select(chatSelectors.selectMessagesLoading);

    this.messageSubmitForm = new FormGroup({
      content: new FormControl(null, Validators.required),
    });
    this.chatService.createChatSocket(1);
    const chat$ = this.chatService.chatSocket$.subscribe((message) => {
      this.store.dispatch(chatActions.pushMessage({ message }));
    });
    this._sub$.add(chat$);
  }

  get content() {
    return this.messageSubmitForm.get('content');
  }

  handleMessageSubmit() {
    this.chatService.sendMessage({ message: this.content.value, senderId: this.currentUser.id });
  }

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
    this.chatService.closeSocketConnection();
  }
}
