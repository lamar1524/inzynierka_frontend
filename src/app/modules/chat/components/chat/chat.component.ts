import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgScrollbar } from 'ngx-scrollbar';
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
export class ChatComponent implements AfterViewInit, OnDestroy {
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;

  private _threadId: number;
  private _sub$: Subscription;
  private _nextUrl: string;

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
    this._sub$.add(route$);
    this._sub$.add(currentUser$);
    this._sub$.add(chat$);
  }

  get content() {
    return this.messageSubmitForm.get('content');
  }

  ngAfterViewInit() {
    const messages$ = this.store
      .select(chatSelectors.selectMessages)
      .pipe(filter((messages) => !!messages))
      .subscribe((messages) => {
        if (messages.type === LAST_MESSAGE_TYPE.SINGLE) {
          this.messages = [...this.messages, ...messages.results];
        } else {
          this.messages = [...messages.results, ...this.messages];
        }
        this._nextUrl = messages.next;
        if (this.firstLoading || messages.type === LAST_MESSAGE_TYPE.SINGLE) {
          this.cdRef.detectChanges();
          this.firstLoading = false;
          this.scrollbarRef.scrollTo({ bottom: 0 });
        }
        this.cdRef.markForCheck();
      });
    this._sub$.add(messages$);
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
