import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { adminActions, AdminModuleState, adminSelectors } from '../../store';
import { IUser } from '../../../../interfaces';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnDestroy {
  private _nextUrl: string;
  private _sub$: Subscription;

  public usersList: MatTableDataSource<IUser>;
  public usersLoading: boolean;
  public readonly displayedColumns: string[];

  constructor(private _store: Store<AdminModuleState>) {
    this.displayedColumns = ['photo', 'email', 'firstName', 'lastName', 'active'];
    this._sub$ = new Subscription();
    this.usersList = new MatTableDataSource<IUser>();
    this.usersLoading = false;
    const usersListSubscription$ = this._store
      .select(adminSelectors.selectUsersList)
      .pipe(filter((users) => !!users))
      .subscribe((usersList) => {
        this._nextUrl = usersList.next;
        this.usersList.data = [...this.usersList.data, ...usersList.users];
      });
    this._sub$.add(usersListSubscription$);
    const usersLoadingSub$ = this._store.select(adminSelectors.selectUsersLoading).subscribe((loading) => {
      this.usersLoading = loading;
    });
    this._sub$.add(usersLoadingSub$);
    this._store.dispatch(adminActions.loadUsers({ url: null }));
  }

  handleScroll() {
    if (this._nextUrl && !this.usersLoading) {
      this._store.dispatch(adminActions.loadUsers({ url: this._nextUrl }));
    }
  }

  ngOnDestroy() {
    this._store.dispatch(adminActions.clearUsersList());
  }
}
