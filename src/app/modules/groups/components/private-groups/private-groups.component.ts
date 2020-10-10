import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { ROUTES } from '../../../../consts';
import { USER_ROLE } from '../../../../enums';
import { IGroup, IRoutes, IUser } from '../../../../interfaces';
import { selectGroupCreationFormVisibility, selectPrivateGroups, selectPrivateGroupsLoading, GroupsModuleState } from '../../store';
import * as groupsActions from '../../store/groups.actions';

@Component({
  selector: 'app-private-groups',
  templateUrl: './private-groups.component.html',
  styleUrls: ['./private-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('appear', [
      transition('void => *', [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class PrivateGroupsComponent implements OnDestroy {
  groups: IGroup[];
  next: string;
  groupsLoading$: Observable<boolean>;
  tempLoading: boolean;
  sub$: Subscription;
  groupCreationFormVisible: Observable<boolean>;
  currentUser$: Observable<IUser>;

  constructor(private store: Store<GroupsModuleState | AuthModuleState>, private cdRef: ChangeDetectorRef) {
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
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.groupsLoading$ = this.store.select(selectPrivateGroupsLoading).pipe(
      tap((loading) => {
        this.tempLoading = loading;
      }),
    );
    this.groupCreationFormVisible = this.store.select(selectGroupCreationFormVisibility);
    this.sub$.add(groups$);
  }

  get routes(): IRoutes {
    return ROUTES;
  }

  get userRoles() {
    return USER_ROLE;
  }

  handleGroupsScroll() {
    if (this.next !== null && !this.tempLoading) {
      this.store.dispatch(groupsActions.loadPrivateGroups({ url: this.next }));
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  revealGroupCreationForm() {
    this.store.dispatch(groupsActions.showGroupCreationForm());
  }
}
