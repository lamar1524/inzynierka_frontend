import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { USER_ROLE } from '@core/enums';
import { IPost, IUser } from '@core/interfaces';
import { selectAllPosts, selectAllPostsLoading, PostModuleState } from '../../store';

import * as postsActions from '../../store/posts.actions';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPostsComponent implements OnDestroy {
  next: string;
  sub$: Subscription;
  posts: IPost[];
  postsLoading$: Observable<boolean>;
  currentUser: IUser;
  readonly adminRole: USER_ROLE;

  constructor(private store: Store<PostModuleState | AuthModuleState>, private cdRef: ChangeDetectorRef) {
    this.sub$ = new Subscription();
    this.store.dispatch(postsActions.loadAllPosts({ url: null }));
    const posts$ = this.store
      .select(selectAllPosts)
      .pipe(filter((res) => res !== null))
      .subscribe((resPosts) => {
        this.next = resPosts?.next;
        this.posts = resPosts?.posts;
        this.cdRef.markForCheck();
      });
    this.sub$.add(posts$);
    this.postsLoading$ = this.store.select(selectAllPostsLoading);
    const currentUser$ = this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
    });
    this.sub$.add(currentUser$);
    this.adminRole = USER_ROLE.ADMIN;
  }

  getPerm(post: IPost): boolean {
    return post.owner.id === this.currentUser.id || this.currentUser.role === USER_ROLE.ADMIN;
  }

  updatePost(post: IPost) {
    console.log(post);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
