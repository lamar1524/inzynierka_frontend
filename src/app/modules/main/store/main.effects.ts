import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { GroupsService, PopupService } from '@core/services';
import * as mainActions from '../store/main.actions';

@Injectable()
export class MainEffects {
  constructor(private groupsService: GroupsService, private popupService: PopupService, private actions$: Actions) {}

  loadBaseGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mainActions.loadBaseGroups),
      switchMap(() =>
        this.groupsService.getGroups().pipe(
          map((res) => mainActions.loadBaseGroupsSuccess({ baseGroups: res.groups.slice(0, 5) })),
          catchError(() => {
            this.popupService.error('Błąd ładowania grup');
            return of(mainActions.loadBaseGroupsFail());
          }),
        ),
      ),
    ),
  );
}
