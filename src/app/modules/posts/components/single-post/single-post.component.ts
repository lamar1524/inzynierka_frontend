import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { USER_ROLE } from '@core/enums';
import { IComment, IPost, IUser } from '@core/interfaces';
import { deletePost, editPost, selectDeletingPost, selectEditingPost, CoreModuleState } from '@core/store';
import {
  selectComments,
  selectCommentsLoading,
  selectCommentAdding,
  selectSinglePost,
  selectSinglePostLoading,
  PostsModuleState,
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
  commentAdding$: Observable<boolean>;
  addForm: FormGroup;
  formVisible: boolean;
  previousBool: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AuthModuleState | PostsModuleState | CoreModuleState>,
    private cdRef: ChangeDetectorRef,
  ) {
    this.sub$ = new Subscription();
    this.comments = [];
    this.route.params.subscribe((param) => {
      this.postId = param.id;
      this.store.dispatch(postsActions.loadPost({ id: this.postId }));
      this.store.dispatch(postsActions.loadComments({ url: null, id: this.postId }));
      this.cdRef.markForCheck();
    });
    this.post$ = this.store.select(selectSinglePost);
    this.postEditing$ = this.store.select(selectEditingPost);
    this.postLoading$ = this.store.select(selectSinglePostLoading);
    this.commentsLoading$ = this.store.select(selectCommentsLoading);
    this.postDeleting$ = this.store.select(selectDeletingPost);
    const comments$ = this.store
      .select(selectComments)
      .pipe(filter((res) => res !== null))
      .subscribe((resComments) => {
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
    this.addForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });
    this.commentAdding$ = this.store.select(selectCommentAdding).pipe(
      tap((res) => {
        if (res) {
          this.addForm.disable();
        } else {
          this.addForm.enable();
          this.addForm.reset();
          if (this.previousBool) {
            this.cancel();
          }
        }
        this.previousBool = res;
        this.cdRef.markForCheck();
      }),
    );
    this.formVisible = false;
  }

  isOwner(obj: IPost | IComment, user: IUser): boolean {
    return obj.owner.id === user.id;
  }

  isAdminOrIsOwner(obj: IPost | IComment, user: IUser): boolean {
    return obj.owner.id === user.id || user.role === USER_ROLE.ADMIN;
  }

  updatePost = ($event: { id: number; data: FormData }) =>
    this.store.dispatch(editPost({ post: $event.data, id: $event.id, refreshAction: postsActions.loadPost({ id: this.postId }) }));

  deletePost = ($event: { id: number }) =>
    this.store.dispatch(deletePost({ id: $event.id, refreshAction: postsActions.loadAllPosts({ url: null }) }));

  @HostListener('window:scroll') scrollEvent() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.next !== null) {
        this.store.dispatch(postsActions.loadComments({ url: this.next, id: this.postId }));
      }
    }
  }

  submitAdd() {
    this.store.dispatch(
      postsActions.addComment({
        comment: this.addForm.value,
        postId: this.postId,
        refreshAction: postsActions.loadComments({ url: null, id: this.postId }),
      }),
    );
  }

  showForm($event) {
    this.formVisible = true;
    this.cdRef.markForCheck();
  }

  cancel() {
    this.formVisible = false;
    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
