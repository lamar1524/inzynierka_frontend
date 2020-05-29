import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { URLS } from '@core/consts';
import { IPost, IUser } from '@core/interfaces';
import { Store } from '@ngrx/store';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { $e } from 'codelyzer/angular/styles/chars';
import { Observable, Subscription } from 'rxjs';
import { selectAllPosts, selectAllPostsLoading, PostModuleState } from '../../store';
import * as postsActions from '../../store/posts.actions';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPostsComponent implements OnDestroy {
  postsLoading$: Observable<boolean>;
  posts: IPost[];
  posts$: Subscription;
  next: string;
  currentUser$: Observable<IUser>;

  constructor(private store: Store<AuthModuleState | PostModuleState>, private cdRef: ChangeDetectorRef) {
    this.store.dispatch(postsActions.loadAllPosts({ url: null }));
    this.postsLoading$ = this.store.select(selectAllPostsLoading);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.posts$ = this.store.select(selectAllPosts).subscribe((resPosts) => {
      this.posts = resPosts.posts;
      this.next = resPosts.next;
      this.cdRef.markForCheck();
    });
  }

  updatePost($event: { id: number; data: FormData }) {
    this.store.dispatch(postsActions.editPost({ post: $event.data, id: $event.id }));
  }

  @HostListener('window:scroll') scrollEvent() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.next !== null) {
        this.store.dispatch(postsActions.loadAllPosts({ url: this.next }));
      }
    }
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }
}
