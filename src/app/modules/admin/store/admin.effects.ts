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
}
