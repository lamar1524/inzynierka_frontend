import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ROUTES, URLS } from '@core/consts';
import { GroupsService, PopupService } from '@core/services';
import * as groupsActions from './groups.actions';
import { GroupsModuleState } from './groups.reducer';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private popupService: PopupService,
    private router: Router,
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

  makeModerator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.makeModerator),
      switchMap((action) =>
        this.groupsService.makeModerator(action.moderatorId, action.groupId).pipe(
          map(() => {
            this.store.dispatch(groupsActions.loadGroupMembers({ groupId: action.groupId, url: null }));
            this.store.dispatch(groupsActions.loadGroup({ id: action.groupId }));
            this.popupService.success('Pomyślnie ustalono moderatora');
            return groupsActions.makeModeratorSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd ustalania moderatora');
            return of(groupsActions.makeModeratorFail());
          }),
        ),
      ),
    ),
  );

  dropUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.dropMember),
      switchMap((action) =>
        this.groupsService.dropMember(action.memberId, action.groupId).pipe(
          map(() => {
            this.popupService.success('Pomyślnie usunięto użytkownika');
            this.store.dispatch(groupsActions.loadGroupMembers({ groupId: action.groupId, url: null }));
            this.store.dispatch(groupsActions.loadGroup({ id: action.groupId }));
            return groupsActions.dropMemberSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd usuwania użytkownika');
            return of(groupsActions.dropMemberSuccess());
          }),
        ),
      ),
    ),
  );

  loadPendingMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.loadPendingMembers),
      switchMap((action) =>
        this.groupsService.loadPendingMembersList(action.url ? action.url : URLS.loadPendingMembers + action.groupId + '/').pipe(
          map((res) => groupsActions.loadPendingMembersSuccess({ pendingMembers: res })),
          catchError((res) => {
            this.popupService.error('Błąd ładowania oczekujących');
            return of(groupsActions.loadPendingMembersFail());
          }),
        ),
      ),
    ),
  );

  acceptPending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.acceptPendingMember),
      switchMap((action) =>
        this.groupsService.acceptPending(action.groupId, action.userId).pipe(
          map((res) => {
            this.popupService.success(res.message);
            this.store.dispatch(groupsActions.loadPendingMembers({ url: null, groupId: action.groupId }));
            this.store.dispatch(groupsActions.loadGroupMembers({ url: null, groupId: action.groupId }));
            this.store.dispatch(groupsActions.loadGroup({ id: action.groupId }));
            return groupsActions.acceptPendingMemberSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd akceptowania użytkownika');
            return of(groupsActions.acceptPendingMemberFail());
          }),
        ),
      ),
    ),
  );

  rejectPending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.rejectPendingMember),
      switchMap((action) =>
        this.groupsService.rejectPending(action.groupId, action.userId).pipe(
          map((res) => {
            this.popupService.success(res.message);
            this.store.dispatch(groupsActions.loadPendingMembers({ url: null, groupId: action.groupId }));
            this.store.dispatch(groupsActions.loadGroup({ id: action.groupId }));
            return groupsActions.rejectPendingMemberSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd akceptowania użytkownika');
            return of(groupsActions.rejectPendingMemberFail());
          }),
        ),
      ),
    ),
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.deleteGroup),
      switchMap((action) =>
        this.groupsService.deleteGroup(action.groupId).pipe(
          map((res) => {
            this.popupService.success(res.message);
            this.router.navigate([ROUTES.privateGroups.path]);
            return groupsActions.deleteGroupSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd usuwania grupy');
            return of(groupsActions.deleteGroupFail());
          }),
        ),
      ),
    ),
  );

  leaveGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.leaveGroup),
      switchMap((action) =>
        this.groupsService.leaveGroup(action.groupId).pipe(
          map((res) => {
            this.popupService.success(res.message);
            this.router.navigate([ROUTES.privateGroups.path]);
            return groupsActions.leaveGroupSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd opuszczania grupy');
            return of(groupsActions.leaveGroupFail());
          }),
        ),
      ),
    ),
  );

  editGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.editGroup),
      switchMap((action) =>
        this.groupsService.editGroup(action.group, action.groupId).pipe(
          map((res) => {
            this.popupService.success('Dane zostały zachowane');
            this.store.dispatch(groupsActions.loadGroup({ id: action.groupId }));
            return groupsActions.editGroupSuccess();
          }),
          catchError((error) => {
            error.status === 406 ? this.popupService.error('Istnieje już grupa o tej nazwie!') : this.popupService.error('Błąd edycji');
            return of(groupsActions.editGroupFail());
          }),
        ),
      ),
    ),
  );

  searchForGroups = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.searchForGroup),
      switchMap((action) =>
        this.groupsService.searchForGroups(action.url ? action.url : URLS.searchForGroups + '?phrase=' + action.phrase).pipe(
          map((res) => groupsActions.searchForGroupSuccess({ results: res })),
          catchError(() => {
            this.popupService.error('Błąd szukania grup');
            return of(groupsActions.searchForGroupFail());
          }),
        ),
      ),
    ),
  );

  joinGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.joinGroup),
      switchMap((action) =>
        this.groupsService.joinGroup(action.groupId).pipe(
          map((res) => {
            this.popupService.success(res.message);
            return groupsActions.joinGroupSuccess();
          }),
          catchError((error) => {
            if (error.status === 406) {
              this.popupService.error(error.error.message);
            } else {
              this.popupService.error('Błąd dołączania do grupy');
            }
            return of(groupsActions.joinGroupFail());
          }),
        ),
      ),
    ),
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.createGroup),
      switchMap(({ groupName, onSuccessCallback }) =>
        this.groupsService.createGroup(groupName).pipe(
          map((result) => {
            console.log(result);
            this.popupService.success('Pomyślnie dodano grupę');
            onSuccessCallback();
            return groupsActions.createGroupSuccess();
          }),
          catchError((error) => {
            this.popupService.error('Błąd tworzenia grupy, spróbuj ponownie później');
            return of(groupsActions.createGroupFail());
          }),
        ),
      ),
    ),
  );
}
