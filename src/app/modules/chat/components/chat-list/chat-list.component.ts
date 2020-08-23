import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ROUTES } from '../../../../consts';
import { IRoutes } from '../../../../interfaces';
import { chatActions, chatSelectors, ChatModuleState } from '../../store';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnDestroy {
  public messages: [string, string];
  public threadsLoading: Observable<boolean>;

  private _sub$: Subscription;

  constructor(private store: Store<ChatModuleState>) {
    this.messages = ['Paweł Młynarski', 'Andrzej działowy'];
    this._sub$ = new Subscription();
    this.store.dispatch(chatActions.loadThreads({ url: null }));
    this.store.select(chatSelectors.selectThreadsLoading);
    const threads$ = this.store.select(chatSelectors.selectThreads).subscribe((threads) => {});
    this._sub$.add(threads$);
  }

  get routes(): IRoutes {
    return ROUTES;
  }

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
  }
}
