import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { ROUTES } from '@core/consts';
import { USER_ROLE } from '@core/enums';
import { IGroup, IPost, IUser } from '@core/interfaces';
import { deletePost, editPost, selectDeletingPost, selectEditingPost, CoreModuleState } from '@core/store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { selectGroup, selectGroupLoading, selectGroupPosts, selectGroupPostsLoading, GroupsModuleState } from '../../store';
import * as groupsActions from '../../store/groups.actions';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnDestroy {
  sub$: Subscription;
  group: IGroup;
  currentUser: IUser;
  groupLoading$: Observable<boolean>;
  postsLoading$: Observable<boolean>;
  postEditing$: Observable<boolean>;
  postDeleting$: Observable<boolean>;
  posts: IPost[];
  next: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<GroupsModuleState | AuthModuleState | CoreModuleState>,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) {
    this.sub$ = new Subscription();
    const route$ = this.route.params.subscribe((params) => {
      this.store.dispatch(groupsActions.loadGroup({ id: params.id }));
      this.store.dispatch(groupsActions.loadGroupsPosts({ url: null, id: params.id }));
      this.cdRef.markForCheck();
    });
    const group$ = this.store
      .select(selectGroup)
      .pipe(filter((group) => group !== null))
      .subscribe((group) => {
        this.group = group;
        this.cdRef.markForCheck();
      });
    const currentUser$ = this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
      this.cdRef.markForCheck();
    });
    const posts$ = this.store
      .select(selectGroupPosts)
      .pipe(filter((res) => res !== null))
      .subscribe((resPosts) => {
        this.posts = resPosts.posts;
        this.next = resPosts.next;
        this.cdRef.markForCheck();
      });
    this.sub$.add(route$);
    this.sub$.add(group$);
    this.sub$.add(currentUser$);
    this.sub$.add(posts$);
    this.groupLoading$ = this.store.select(selectGroupLoading);
    this.postsLoading$ = this.store.select(selectGroupPostsLoading);
    this.postEditing$ = this.store.select(selectEditingPost);
    this.postDeleting$ = this.store.select(selectDeletingPost);
  }

  get ownerOrAdmin() {
    return this.group?.owner.id === this.currentUser?.id || this.currentUser?.role === USER_ROLE.ADMIN;
  }

  postOwner(post: IPost) {
    return post?.owner.id === this.currentUser?.id;
  }

  postOwnerOrAdmin(post: IPost) {
    return post?.owner.id === this.currentUser?.id || this.currentUser?.role === USER_ROLE.ADMIN;
  }

  routeToPost(event: { id: number }) {
    this.router.navigate([ROUTES.singlePost.path + event.id + '/']);
  }

  updatePost = ($event: { id: number; data: FormData }) =>
    this.store.dispatch(
      editPost({ post: $event.data, id: $event.id, refreshAction: groupsActions.loadGroupsPosts({ url: null, id: this.group.id }) }),
    );

  deletePost = ($event: { id: number }) =>
    this.store.dispatch(deletePost({ id: $event.id, refreshAction: groupsActions.loadGroupsPosts({ url: null, id: this.group.id }) }));

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
