import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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

  messages$: Observable<IMessage[]>;
  messagesLoading$: Observable<boolean>;
  messageSubmitForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<ChatModuleState>) {
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
  }

  get content() {
    return this.messageSubmitForm.get('content');
  }

  handleMessageSubmit() {}

  // private _fetchData() {}

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
  }
}
