import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IResponseUsers, IUser } from '@core/interfaces';
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

  constructor(private store: Store<MainModuleState>, @Inject(DOCUMENT) private document: Document) {
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
  }

  hover(event) {
    event.target.classList.add('u-item--hover');
  }

  unHover(event) {
    event.target.classList.remove('u-item--hover');
  }

  loadMoreFriends(event) {
    const element = event.target;
    if (element.offsetHeight + element.scrollTop >= this.document.body.offsetHeight) {
      if (this.next !== null && !this.loading) {
        this.store.dispatch(loadFriendsList({ url: this.next }));
      }
    }
  }
}
