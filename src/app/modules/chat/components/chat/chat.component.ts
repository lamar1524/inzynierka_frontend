import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
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
export class ChatComponent implements AfterViewChecked, OnDestroy {
  @ViewChild(PerfectScrollbarComponent, { static: false }) scrollComponentRef?: PerfectScrollbarComponent;

  private _threadId: number;
  private _sub$: Subscription;
  private _hasBeenChecked: boolean;

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
    this._hasBeenChecked = false;
    this.messages = [];
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
    this.messagesLoading$ = this.store.select(chatSelectors.selectMessagesLoading);

    this.messageSubmitForm = new FormGroup({
      content: new FormControl(null, Validators.required),
    });
    const chat$ = this.chatService.chatSocket$.subscribe((message) => {
      this.store.dispatch(chatActions.pushMessage({ message }));
    });
    const messages$ = this.store.select(chatSelectors.selectMessages).subscribe((messages) => {
      let shouldScroll = false;
      if (messages.length - this.messages.length !== 1 && !this.scrollComponentRef) {
        shouldScroll = true;
      }
      this.messages = [...messages];
      this._hasBeenChecked = shouldScroll;
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
    if (this.messages.length > 0 && !this._hasBeenChecked) {
      this.scrollComponentRef.directiveRef.scrollToBottom();
      this._hasBeenChecked = true;
    }
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
