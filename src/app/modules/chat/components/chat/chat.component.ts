import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
export class ChatComponent implements AfterViewInit, OnDestroy {
  @ViewChild('messageList', { static: false }) messageListWrapper: ElementRef;

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
    const route$ = this.activatedRoute.params.subscribe((params) => {
      this._threadId = params.id;
      this.store.dispatch(chatActions.loadMessages({ url: null, threadId: this._threadId }));
      this.chatService.createChatSocket(this._threadId);
    });
    const messages$ = this.store.select(chatSelectors.selectMessages).subscribe((messages) => {
      this.messages = [...messages];
      this.cdRef.markForCheck();
      if (this.messageListWrapper && messages.length > 0) {
        this._scrollToDown();
      }
    });
    this.messagesLoading$ = this.store.select(chatSelectors.selectMessagesLoading);

    this.messageSubmitForm = new FormGroup({
      content: new FormControl(null, Validators.required),
    });
    const chat$ = this.chatService.chatSocket$.subscribe((message) => {
      this.store.dispatch(chatActions.pushMessage({ message }));
    });
    this._sub$.add(messages$);
    this._sub$.add(route$);
    this._sub$.add(currentUser$);
    this._sub$.add(chat$);
  }

  get content() {
    return this.messageSubmitForm.get('content');
  }

  ngAfterViewInit() {
    this._scrollToDown();
  }

  private _scrollToDown() {
    const element = this.messageListWrapper.nativeElement;
    element.scroll({
      top: element.scrollHeight,
    });
  }

  handleMessageSubmit() {
    this.chatService.sendMessage({ message: this.content.value, senderId: this.currentUser.id });
    this.content.setValue('');
  }

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
    this.chatService.closeSocketConnection();
  }
}
