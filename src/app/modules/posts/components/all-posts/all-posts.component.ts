import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { IPost } from '@core/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  posts$: Subscription;
  posts: IPost[];
  postsLoading$: Observable<boolean>;

  constructor(private store: Store<PostModuleState>, private cdRef: ChangeDetectorRef) {
    this.store.dispatch(postsActions.loadAllPosts({ url: null }));
    this.posts$ = this.store
      .select(selectAllPosts)
      .pipe(filter((res) => res !== null))
      .subscribe((resPosts) => {
        this.next = resPosts?.next;
        this.posts = resPosts?.posts;
        this.cdRef.markForCheck();
      });
    this.postsLoading$ = this.store.select(selectAllPostsLoading);
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }
}
