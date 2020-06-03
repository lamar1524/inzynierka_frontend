import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { USER_ROLE } from '@core/enums';
import { IGroup, IUser } from '@core/interfaces';
import { selectGroup, GroupsModuleState } from '../../store';
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

  constructor(private route: ActivatedRoute, private store: Store<GroupsModuleState | AuthModuleState>, private cdRef: ChangeDetectorRef) {
    this.sub$ = new Subscription();
    const route$ = this.route.params.subscribe((params) => {
      this.store.dispatch(groupsActions.loadGroup({ id: params.id }));
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
    this.sub$.add(route$);
    this.sub$.add(group$);
    this.sub$.add(currentUser$);
  }

  get ownerOrAdmin() {
    return this.group?.owner.id === this.currentUser?.id || this.currentUser?.role === USER_ROLE.ADMIN;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
