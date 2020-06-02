import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { IGroup } from '@core/interfaces';
import { Store } from '@ngrx/store';
import * as postsActions from '@posts/store/posts.actions';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { selectPrivateGroups, selectPrivateGroupsLoading, GroupsModuleState } from '../../store';
import * as groupsActions from '../../store/groups.actions';

@Component({
  selector: 'app-private-groups',
  templateUrl: './private-groups.component.html',
  styleUrls: ['./private-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateGroupsComponent implements OnDestroy {
  groups: IGroup[];
  next: string;
  groupsLoading$: Observable<boolean>;
  sub$: Subscription;

  constructor(private store: Store<GroupsModuleState>, private cdRef: ChangeDetectorRef) {
    this.groups = [];
    this.sub$ = new Subscription();
    this.store.dispatch(groupsActions.loadPrivateGroups({ url: null }));
    const groups$ = this.store
      .select(selectPrivateGroups)
      .pipe(filter((res) => res !== null))
      .subscribe((resGroups) => {
        this.groups = resGroups.groups;
        this.next = resGroups.next;
        this.cdRef.markForCheck();
      });
    this.groupsLoading$ = this.store.select(selectPrivateGroupsLoading);
    this.sub$.add(groups$);
  }
  @HostListener('window:scroll') scroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.next !== null) {
        this.store.dispatch(groupsActions.loadPrivateGroups({ url: this.next }));
      }
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
