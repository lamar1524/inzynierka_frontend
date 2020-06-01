import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { USER_ROLE } from '@core/enums';
import { IComment, IPost, IUser } from '@core/interfaces';
import {
  selectComments,
  selectCommentsLoading,
  selectDeletingPost,
  selectEditingPost,
  selectSinglePost,
  selectSinglePostLoading,
  PostModuleState,
} from '@posts/store';
import * as postsActions from '../../store/posts.actions';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent implements OnDestroy {
  postId: number;
  post$: Observable<IPost>;
  postLoading$: Observable<boolean>;
  sub$: Subscription;
  commentsLoading$: Observable<boolean>;
  comments: IComment[];
  next: string;
  currentUser: IUser;
  postEditing$: Observable<boolean>;
  postDeleting$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AuthModuleState | PostModuleState>, private cdRef: ChangeDetectorRef) {
    this.sub$ = new Subscription();
    this.comments = [];
    this.route.params.subscribe((param) => {
      this.postId = param.id;
      this.store.dispatch(postsActions.loadPost({ id: this.postId }));
      this.store.dispatch(postsActions.loadComments({ id: this.postId }));
      this.cdRef.markForCheck();
    });
    this.post$ = this.store.select(selectSinglePost);
    this.postEditing$ = this.store.select(selectEditingPost);
    this.postLoading$ = this.store.select(selectSinglePostLoading);
    this.commentsLoading$ = this.store.select(selectCommentsLoading);
    this.postDeleting$ = this.store.select(selectDeletingPost);
    const comments$ = this.store.select(selectComments).subscribe((resComments) => {
      this.next = resComments.next;
      this.comments = resComments.comments;
      this.cdRef.markForCheck();
    });
    const currentUser$ = this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
      this.cdRef.markForCheck();
    });
    this.sub$.add(comments$);
    this.sub$.add(currentUser$);
  }

  isOwner(obj: IPost | IComment, user: IUser): boolean {
    return obj.owner.id === user.id;
  }

  isAdminOrIsOwner(obj: IPost | IComment, user: IUser): boolean {
    return obj.owner.id === user.id || user.role === USER_ROLE.ADMIN;
  }

  updatePost = ($event: { id: number; data: FormData }) =>
    this.store.dispatch(
      postsActions.editPost({ post: $event.data, id: $event.id, refreshAction: postsActions.loadAllPosts({ url: null }) }),
    );

  deletePost = ($event: { id: number }) =>
    this.store.dispatch(postsActions.deletePost({ id: $event.id, refreshAction: postsActions.loadAllPosts({ url: null }) }));

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
