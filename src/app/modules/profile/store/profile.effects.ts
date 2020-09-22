import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PopupService, ProfileService } from '@core/services';
import { ROUTES } from '../../../consts';
import * as profileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private popupService: PopupService,
    private router: Router,
  ) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.loadProfileData),
      switchMap((action) =>
        this.profileService.getProfile(action.userId).pipe(
          map((res) => profileActions.loadProfileDataSuccess({ user: res })),
          catchError(() => {
            this.popupService.error('Błąd ładowania profilu');
            return of(profileActions.loadProfileDataFail());
          }),
        ),
      ),
    ),
  );

  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.editProfileData),
      switchMap((action) =>
        this.profileService.editProfile(action.user).pipe(
          map((res) => {
            this.popupService.success('Profil pomyślnie edytowany');
            return profileActions.editProfileDataSuccess({ user: res });
          }),
          catchError((error) => {
            this.popupService.error('Edytowanie profilu nieudane, spróbuj ponownie');
            return of(profileActions.editProfileDataFail());
          }),
        ),
      ),
    ),
  );

  fetchOrCreateThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.fetchOrCreateThread),
      switchMap((action) =>
        this.profileService.fetchOrCreateThread(action.user2Id).pipe(
          map((res) => {
            this.router.navigate([ROUTES.singleChat.path + res.id]);
            return profileActions.fetchOrCreateThreadSuccess();
          }),
          catchError((err) => {
            this.popupService.error('Błąd pobierania wiadomości');
            return of(profileActions.fetchOrCreateThreadFail());
          }),
        ),
      ),
    ),
  );
}
