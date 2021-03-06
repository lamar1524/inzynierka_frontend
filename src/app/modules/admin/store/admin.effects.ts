import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '@core/services/admin.service';
import { of } from 'rxjs';

import * as adminActions from './admin.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { URLS } from '../../../consts';
import { PopupService } from '@core/services';

@Injectable()
export class AdminEffects {
  constructor(private _actions$: Actions, private _adminService: AdminService, private _popupService: PopupService) {}

  fetchUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadUsers),
      switchMap((action) =>
        this._adminService.fetchUsersList(action.url ? action.url : URLS.usersList).pipe(
          map((response) => adminActions.loadUsersSuccess({ users: { ...response } })),
          catchError(() => {
            this._popupService.error('Błąd pobierania użytkowników');
            return of(adminActions.loadUsersFail());
          }),
        ),
      ),
    ),
  );

  toggleUserActivity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.toggleUserActivity),
      switchMap((action) =>
        this._adminService.toggleUserActivity(action.userId).pipe(
          map(() => {
            action.refreshAction();
            this._popupService.success('Pomyślnie zaktualizowałeś aktywność użytkownika');
            return adminActions.toggleUserActivitySuccess();
          }),
          catchError(() => {
            this._popupService.error('Błąd aktualizacji aktywności użytkownika');
            return of(adminActions.toggleUserActivityFail());
          }),
        ),
      ),
    ),
  );

  setUserRole$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.setUserRole),
      switchMap((action) =>
        this._adminService.setUserRole(action.userId, action.role).pipe(
          map(() => {
            this._popupService.success('Pomyślnie zaktualizowano uprawnienia użytkownika');
            action.refreshAction();
            return adminActions.setUserRoleSuccess();
          }),
          catchError(() => {
            this._popupService.error('Błąd zmiany uprawnień uzytkownika');
            return of(adminActions.setUserRoleFail());
          }),
        ),
      ),
    ),
  );
}
