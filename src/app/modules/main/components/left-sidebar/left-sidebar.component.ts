import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGroup } from '@core/interfaces/group.interface';
import { loadBaseGroups, selectBaseGroups, selectBaseGroupsLoading, MainModuleState } from '../../store';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebarComponent {
  groups$: Observable<IGroup[]>;
  groupsLoading$: Observable<boolean>;

  constructor(private store: Store<MainModuleState>) {
    this.store.dispatch(loadBaseGroups());
    this.groups$ = this.store.select(selectBaseGroups);
    this.groupsLoading$ = this.store.select(selectBaseGroupsLoading);
  }
}
