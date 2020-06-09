import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { PopupService, ProfileService } from '@core/services';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as profileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private profileService: ProfileService, private popupService: PopupService) {}

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
}
