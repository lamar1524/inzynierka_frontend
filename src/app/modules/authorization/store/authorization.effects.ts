import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@core/consts';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PopupService } from '@core/services';
import { AuthService } from '../services';
import * as authActions from './authorization.actions';

@Injectable()
export class AuthorizationEffects {
  constructor(private actions$: Actions, private authService: AuthService, private popupService: PopupService, private router: Router) {}

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

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap((action) =>
        this.authService.registerUser(action.data).pipe(
          map((res) => {
            this.popupService.success('Zarejestrowałeś się z sukcesem! Teraz czekaj na akceptację administratora', 5000);
            this.router.navigate([ROUTES.login.path]);
            return authActions.registerSuccess();
          }),
          catchError((error) => {
            this.popupService.error(error.error.email[0]);
            return of(authActions.registerFailed());
          }),
        ),
      ),
    ),
  );
}
