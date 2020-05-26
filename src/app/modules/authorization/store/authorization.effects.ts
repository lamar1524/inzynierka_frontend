import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PopupService } from '@core/services';
import { AuthService } from '../services';
import * as authActions from './authorization.actions';

@Injectable()
export class AuthorizationEffects {
  constructor(private actions$: Actions, private authService: AuthService, private popupService: PopupService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap((action) =>
        this.authService.loginUser(action.data).pipe(
          map((res) => authActions.loginSuccess({ user: res })),
          catchError(() => {
            this.popupService.error('Podałeś błędne dane');
            return of(authActions.loginFailed());
          }),
        ),
      ),
    ),
  );
}
