import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  searchForm: FormGroup;

  constructor(private store: Store<MainModuleState>, @Inject(DOCUMENT) private document: Document) {
    this.store.dispatch(loadBaseGroups());
    this.groups$ = this.store.select(selectBaseGroups);
    this.groupsLoading$ = this.store.select(selectBaseGroupsLoading);
    this.searchForm = new FormGroup({
      phrase: new FormControl(null),
    });
  }

  navigateToSearch() {
    const data = this.searchForm.value;
    if (data.phrase !== null && data.phrase !== '') {
    }
  }

  hover(event) {
    event.target.classList.add('u-item--hover');
  }

  unHover(event) {
    event.target.classList.remove('u-item--hover');
  }
}
