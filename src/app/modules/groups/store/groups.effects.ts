import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { URLS } from '@core/consts';
import { GroupsService, PopupService } from '@core/services';
import * as groupsActions from './groups.actions';
import { GroupsModuleState } from './groups.reducer';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private popupService: PopupService,
    private store: Store<GroupsModuleState>,
  ) {}

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

  loadGroupsPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.loadGroupsPosts),
      switchMap((action) =>
        this.groupsService.groupsPost(action.url ? action.url : URLS.groupsPosts + action.id + '/').pipe(
          map((res) => groupsActions.loadGroupsPostsSuccess({ posts: res })),
          catchError(() => {
            this.popupService.error('Błąd ładowania postów');
            return of(groupsActions.loadGroupsPostsFail());
          }),
        ),
      ),
    ),
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.addPost),
      switchMap((action) =>
        this.groupsService.addPost(action.post, action.groupId).pipe(
          map(() => {
            this.store.dispatch(action.refreshAction);
            this.store.dispatch(groupsActions.hideAddingPostForm());
            this.popupService.success('Pomyślnie dodano post');
            return groupsActions.addPostSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd dodawania posta');
            return of(groupsActions.addPostFail());
          }),
        ),
      ),
    ),
  );

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.loadGroupMembers),
      switchMap((action) =>
        this.groupsService.loadMembers(action.url ? action.url : URLS.loadGroupMembers + action.groupId + '/').pipe(
          map((res) => groupsActions.loadGroupMembersSuccess({ members: res })),
          catchError(() => {
            this.popupService.error('Błąd ładowania członków');
            return of(groupsActions.loadGroupMembersFail());
          }),
        ),
      ),
    ),
  );
}
