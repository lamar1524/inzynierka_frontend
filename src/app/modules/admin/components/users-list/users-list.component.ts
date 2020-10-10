import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { adminActions, AdminModuleState, adminSelectors } from '../../store';
import { IUser } from '../../../../interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '@core/services';
import { AuthModuleState, selectCurrentUser } from '@authorization/store';
import { USER_ROLE } from '../../../../enums';
import { MatSelectChange } from '@angular/material/select';

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
  public usersCount: number;
  public readonly displayedColumns: string[];
  public readonly availableUserRoles: USER_ROLE[];
  public userToggling$: Observable<boolean>;
  public settingUserRoleLoading$: Observable<boolean>;
  public currentUser$: Observable<IUser>;

  constructor(private _store: Store<AdminModuleState | AuthModuleState>, private _dialogService: DialogService) {
    this.displayedColumns = ['photo', 'email', 'firstName', 'lastName', 'active', 'role'];
    this.availableUserRoles = [USER_ROLE.ADMIN, USER_ROLE.LECTURER, USER_ROLE.USER];
    this.usersCount = 0;
    this._sub$ = new Subscription();
    this.usersList = new MatTableDataSource<IUser>();
    this.usersLoading = false;
    const usersListSubscription$ = this._store
      .select(adminSelectors.selectUsersList)
      .pipe(filter((users) => !!users))
      .subscribe((usersList) => {
        this._nextUrl = usersList.next;
        this.usersCount = usersList.count;
        this.usersList.data = [...usersList.users];
      });
    this._sub$.add(usersListSubscription$);
    const usersLoadingSub$ = this._store.select(adminSelectors.selectUsersLoading).subscribe((loading) => {
      this.usersLoading = loading;
    });
    this._sub$.add(usersLoadingSub$);
    this._fetchData();
    this.userToggling$ = this._store.select(adminSelectors.selectActivityToggleLoading);
    this.currentUser$ = this._store.select(selectCurrentUser).pipe(filter((user) => !!user));
    this.settingUserRoleLoading$ = this._store.select(adminSelectors.selectSettingRoleLoading);
  }

  private _fetchData = () => {
    this._store.dispatch(adminActions.clearUsersList());
    this._store.dispatch(adminActions.loadUsers({ url: null }));
  };

  handleScroll() {
    if (this._nextUrl && !this.usersLoading) {
      this._store.dispatch(adminActions.loadUsers({ url: this._nextUrl }));
    }
  }

  openTogglingActivityDialog(element: IUser) {
    const user = { ...element };
    const toggleActivity = () => {
      this._store.dispatch(adminActions.toggleUserActivity({ userId: user.id, refreshAction: this._fetchData }));
    };

    this._dialogService.showDialog({
      header: `${user.active ? 'Blokowanie' : 'Aktywowanie'} użytkownika`,
      caption: `Czy na pewno chcesz ${user.active ? 'zablokować' : 'aktywować'} konto użytkownika ${user.email}?`,
      loadingSelect: this.userToggling$,
      onAcceptCallback: toggleActivity,
    });
  }

  switchUserRole({ value }: MatSelectChange, user: IUser) {
    let futureRole = 0;
    switch (value) {
      case USER_ROLE.LECTURER: {
        futureRole = 1;
        break;
      }
      case USER_ROLE.ADMIN: {
        futureRole = 2;
        break;
      }
      default: {
        futureRole = 0;
      }
    }
    this._store.dispatch(adminActions.setUserRole({ userId: user.id, role: futureRole, refreshAction: this._fetchData }));
  }

  ngOnDestroy() {
    this._store.dispatch(adminActions.clearUsersList());
    this._sub$.unsubscribe();
  }
}
