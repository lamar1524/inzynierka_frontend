import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { PostsModuleState } from '@posts/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GroupsModuleState } from '../../groups/store';
import { PopupService, PostsService } from '../services';
import * as coreActions from './core.actions';

@Injectable()
export class CoreEffects {
  constructor(
    private store: Store<PostsModuleState | GroupsModuleState>,
    private postsService: PostsService,
    private popupService: PopupService,
    private actions$: Actions,
  ) {}

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActions.editPost),
      switchMap((action) =>
        this.postsService.editPost(action.post, action.id).pipe(
          map((res) => {
            this.popupService.success('Pomyślnie edytowano komentarz!');
            this.store.dispatch(action.refreshAction);
            return coreActions.editPostSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd edycji posta');
            return of(coreActions.editPostFail());
          }),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActions.deletePost),
      switchMap((action) =>
        this.postsService.deletePost(action.id).pipe(
          map((res) => {
            this.store.dispatch(action.refreshAction);
            this.popupService.success(res.message);
            return coreActions.deletePostSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd usuwania posta');
            return of(coreActions.deletePostFail());
          }),
        ),
      ),
    ),
  );
}
