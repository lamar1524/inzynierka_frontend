import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PopupService } from '@core/services';
import { ROUTES } from '../../../consts';
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
          map((res) => {
            this.router.navigate([ROUTES.home.path]);
            return authActions.loginSuccess({ user: res });
          }),
          catchError(() => {
            this.popupService.error('Podałeś błędne dane');
            return of(authActions.loginFail());
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
            return of(authActions.registerFail());
          }),
        ),
      ),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadUser),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((res) => authActions.loadUserSuccess({ user: res })),
          catchError((error) => {
            this.popupService.error('Coś poszło nie tak, wylogowywanie');
            this.authService.logout();
            return of(authActions.loadUserFail());
          }),
        ),
      ),
    ),
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutUser),
      switchMap(() => {
        this.authService.logout();
        return of(authActions.logoutUserSuccess());
      }),
    ),
  );
}
