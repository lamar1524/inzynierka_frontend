import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ROUTES } from '../../../../consts';

import { IResponseUsers, IRoutes, IUser } from '../../../../interfaces';
import { loadFriendsList, selectFriends, selectFriendsLoading, MainModuleState } from '../../store';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {
  next: string;
  users$: Observable<IUser[]>;
  usersLoading$: Observable<boolean>;
  loading: boolean;
  readonly routes: IRoutes;

  constructor(private store: Store<MainModuleState>) {
    this.loading = false;
    this.store.dispatch(loadFriendsList({ url: null }));
    this.usersLoading$ = this.store.select(selectFriendsLoading).pipe(
      tap((res) => {
        this.loading = res;
      }),
    );
    this.users$ = this.store.select(selectFriends).pipe(
      map((res: IResponseUsers) => {
        if (res !== null) {
          this.next = res.next;
          return res.users;
        }
      }),
    );
    this.routes = ROUTES;
  }

  hover(event) {
    event.target.classList.add('u-item--hover');
  }

  unHover(event) {
    event.target.classList.remove('u-item--hover');
  }

  loadMoreFriends() {
    if (this.next !== null && !this.loading) {
      this.store.dispatch(loadFriendsList({ url: this.next }));
    }
  }
}
