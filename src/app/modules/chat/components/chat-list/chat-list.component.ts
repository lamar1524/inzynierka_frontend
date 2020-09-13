import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { ROUTES } from '../../../../consts';
import { IRoutes, IUser } from '../../../../interfaces';
import { IThread } from '../../../../interfaces/message.interface';
import { chatActions, chatSelectors, ChatModuleState } from '../../store';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnDestroy {
  public threads$: Observable<IThread[]>;
  public threadsLoading$: Observable<boolean>;
  public currentUser$: Observable<IUser>;

  private _sub$: Subscription;

  constructor(private store: Store<ChatModuleState | AuthModuleState>) {
    this._sub$ = new Subscription();
    this.store.dispatch(chatActions.loadThreads({ url: null }));
    this.threads$ = this.store.select(chatSelectors.selectThreads);
    this.threadsLoading$ = this.store.select(chatSelectors.selectThreadsLoading);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  get routes(): IRoutes {
    return ROUTES;
  }

  getFullName(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
  }

  ngOnDestroy(): void {
    this._sub$.unsubscribe();
  }
}
