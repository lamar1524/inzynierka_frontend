import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IGroup } from '@core/interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { selectPrivateGroups, GroupsModuleState } from '../../store';
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
  sub$: Subscription;

  constructor(private store: Store<GroupsModuleState>, private cdRef: ChangeDetectorRef) {
    this.groups = [];
    this.sub$ = new Subscription();
    this.store.dispatch(groupsActions.loadPrivateGroups());
    const groups$ = this.store
      .select(selectPrivateGroups)
      .pipe(filter((res) => res !== null))
      .subscribe((resGroups) => {
        this.groups = resGroups.groups;
        this.next = resGroups.next;
        this.cdRef.markForCheck();
      });
    this.sub$.add(groups$);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
