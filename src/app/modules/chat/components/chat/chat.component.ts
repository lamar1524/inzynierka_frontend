import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMessage } from '../../../../interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnDestroy {
  private _talkerID;
  private _sub$: Subscription;

  messages: IMessage[];
  messageSubmitForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {
    this._sub$ = new Subscription();
    const route$ = this.activatedRoute.params.subscribe((params) => {
      this._talkerID = params.id;
      console.log(this._talkerID);
    });
    this._sub$.add(route$);

    this.messages = [
      {
        thread: null,
        content: 'No hej',
        sender: 1,
        dateSend: new Date(),
      },
    ];
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
