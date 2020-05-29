import { Injectable } from '@angular/core';
import { URLS } from '@core/consts';
import { PopupService, PostsService } from '@core/services';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as postsActions from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private postsService: PostsService, private popupService: PopupService, private actions$: Actions) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postsActions.loadAllPosts),
      switchMap((action) =>
        this.postsService.loadAllPosts(action.url ? action.url : URLS.allPosts).pipe(
          map((res) => postsActions.loadAllPostsSuccess({ posts: res })),
          catchError(() => {
            this.popupService.error('Błąd ładowania postów');
            return of(postsActions.loadAllPostsFail());
          }),
        ),
      ),
    ),
  );

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postsActions.editPost),
      switchMap((action) =>
        this.postsService.editPost(action.post, action.id).pipe(
          map((res) => {
            this.popupService.success('Pomyślnie edytowano komentarz!');
            return postsActions.editPostSuccess();
          }),
          catchError(() => {
            this.popupService.error('Błąd edycji posta');
            return of(postsActions.editPostFail());
          }),
        ),
      ),
    ),
  );
}
