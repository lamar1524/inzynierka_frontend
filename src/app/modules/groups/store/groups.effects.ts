import { Injectable } from '@angular/core';
import { URLS } from '@core/consts';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { GroupsService, PopupService } from '@core/services';
import * as groupsActions from './groups.actions';

@Injectable()
export class GroupsEffects {
  constructor(private actions$: Actions, private groupsService: GroupsService, private popupService: PopupService) {}

  loadPrivateGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.loadPrivateGroups),
      switchMap((action) =>
        this.groupsService.getGroups(action.url ? action.url : URLS.usersGroups).pipe(
          map((res) => groupsActions.loadPrivateGroupsSuccess({ groups: res })),
          catchError(() => {
            this.popupService.error('Błąd ładowania grup');
            return of(groupsActions.loadPrivateGroupsFail());
          }),
        ),
      ),
    ),
  );

  loadGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.loadGroup),
      switchMap((action) =>
        this.groupsService.getGroup(action.id).pipe(
          map((res) => groupsActions.loadGroupSuccess({ group: res })),
          catchError(() => {
            this.popupService.error('Błąd ładowania grupy');
            return of(groupsActions.loadGroupFail());
          }),
        ),
      ),
    ),
  );
}
