import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { deletePost, editPost, selectDeletingPost, selectEditingPost, CoreModuleState } from '@core/store';
import { ROUTES } from '../../../../consts';
import { IPost, IUser } from '../../../../interfaces';
import { PostsModuleState } from '../../store';
import * as postsActions from '../../store/posts.actions';
import * as postSelectors from '../../store/posts.selectors';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPostsComponent implements OnDestroy {
  postsLoading$: Observable<boolean>;
  postEditing$: Observable<boolean>;
  postDeleting$: Observable<boolean>;
  posts: IPost[];
  posts$: Subscription;
  next: string;
  currentUser$: Observable<IUser>;
  tempLoading: boolean;

  constructor(
    public store: Store<AuthModuleState | PostsModuleState | CoreModuleState>,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    this.store.dispatch(postsActions.loadAllPosts({ url: null }));
    this.postsLoading$ = this.store.select(postSelectors.selectAllPostsLoading).pipe(
      tap((loading) => {
        this.tempLoading = loading;
      }),
    );
    this.postDeleting$ = this.store.select(selectDeletingPost);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.posts$ = this.store.select(postSelectors.selectAllPosts).subscribe((resPosts) => {
      this.posts = resPosts.posts;
      this.next = resPosts.next;
      this.cdRef.markForCheck();
    });
    this.postEditing$ = this.store.select(selectEditingPost);
  }

  updatePost = ($event: { id: number; data: FormData }) =>
    this.store.dispatch(editPost({ post: $event.data, id: $event.id, refreshAction: postsActions.loadAllPosts({ url: null }) }));

  deletePost = ($event: { id: number }) =>
    this.store.dispatch(deletePost({ id: $event.id, refreshAction: postsActions.loadAllPosts({ url: null }) }));

  handlePostsScroll() {
    if (this.next !== null && !this.tempLoading) {
      this.store.dispatch(postsActions.loadAllPosts({ url: this.next }));
    }
  }

  routeToPost($event) {
    this.router.navigate([ROUTES.singlePost.path + $event.id]);
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }
}
