import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTES } from '@core/consts';
import { IRoutes } from '@core/interfaces';
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
  readonly routes: IRoutes;

  constructor(private store: Store<MainModuleState>, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.store.dispatch(loadBaseGroups());
    this.groups$ = this.store.select(selectBaseGroups);
    this.groupsLoading$ = this.store.select(selectBaseGroupsLoading);
    this.searchForm = new FormGroup({
      phrase: new FormControl(null),
    });
    this.routes = ROUTES;
  }

  navigateToSearch() {
    const data = this.searchForm.value;
    if (data.phrase !== null && data.phrase !== '') {
      this.router.navigate([this.routes.search.path + data.phrase]);
      this.searchForm.reset();
    }
  }

  hover(event) {
    event.target.classList.add('u-item--hover');
  }

  unHover(event) {
    event.target.classList.remove('u-item--hover');
  }
}
