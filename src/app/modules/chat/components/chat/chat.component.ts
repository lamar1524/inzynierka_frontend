import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthModuleState } from '@authorization/store';
import * as authSelectors from '@authorization/store/authorization.selectors';
import { ChatService } from '@core/services';
import { LAST_MESSAGE_TYPE } from '../../../../enums/last-message-name.enum';
import { IUser } from '../../../../interfaces';
import { IMessage } from '../../../../interfaces/message.interface';
import { chatActions, chatSelectors, ChatModuleState } from '../../store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements AfterViewChecked, OnDestroy {
  @ViewChild(PerfectScrollbarComponent, { static: false }) scrollComponentRef?: PerfectScrollbarComponent;

  private _threadId: number;
  private _sub$: Subscription;
  private _nextUrl: string;
  private _lastMessageType: LAST_MESSAGE_TYPE;

  currentUser: IUser;
  messages: IMessage[];
  messagesLoading: boolean;
  messageSubmitForm: FormGroup;
  firstLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<ChatModuleState | AuthModuleState>,
    private chatService: ChatService,
    private cdRef: ChangeDetectorRef,
  ) {
    this._sub$ = new Subscription();
    this.messages = [];
    this.firstLoading = true;
    this._lastMessageType = LAST_MESSAGE_TYPE.GROUP;
    const currentUser$ = this.store
      .select(authSelectors.selectCurrentUser)
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.currentUser = user;
        this.cdRef.markForCheck();
      });
    const route$ = this.activatedRoute.params.subscribe((params) => {
      this._threadId = params.id;
      this.store.dispatch(chatActions.loadMessages({ url: null, threadId: this._threadId }));
      this.chatService.createChatSocket(this._threadId);
    });
    const messagesLoading$ = this.store.select(chatSelectors.selectMessagesLoading).subscribe((loading) => {
      this.messagesLoading = loading;
    });
    this._sub$.add(messagesLoading$);

    this.messageSubmitForm = new FormGroup({
      content: new FormControl(null, Validators.required),
    });
    const chat$ = this.chatService.chatSocket$.subscribe((message) => {
      this.store.dispatch(chatActions.pushMessage({ message }));
    });
    const messages$ = this.store
      .select(chatSelectors.selectMessages)
      .pipe(filter((messages) => !!messages))
      .subscribe((messages) => {
        this.messages = [...messages.results, ...this.messages];
        this._lastMessageType = messages.type;
        this._nextUrl = messages.next;
        this.cdRef.markForCheck();
      });
    this._sub$.add(messages$);
    this._sub$.add(route$);
    this._sub$.add(currentUser$);
    this._sub$.add(chat$);
  }

  get content() {
    return this.messageSubmitForm.get('content');
  }

  ngAfterViewChecked() {
    if (
      (this.messages.length > 0 && this._lastMessageType === LAST_MESSAGE_TYPE.SINGLE) ||
      (this.messages.length > 0 && this.firstLoading)
    ) {
      this.scrollComponentRef.directiveRef.scrollToBottom();
      this.firstLoading = false;
    } else if (
      this.messages.length > 0 &&
      this._lastMessageType === LAST_MESSAGE_TYPE.GROUP &&
      !this.firstLoading &&
      this.scrollComponentRef.directiveRef.position().y !== 'end'
    ) {
      this.scrollComponentRef.directiveRef.scrollToY(25);
    }
  }

  handleMessageSubmit() {
    this.chatService.sendMessage({ message: this.content.value, senderId: this.currentUser.id });
    this.content.setValue('');
  }

  handleMessagesScroll() {
    if (!this.messagesLoading && this._nextUrl) {
      this.store.dispatch(chatActions.loadMessages({ url: this._nextUrl, threadId: this._threadId }));
    }
  }

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
    this.chatService.closeSocketConnection();
    this.store.dispatch(chatActions.clearChat());
  }
}
