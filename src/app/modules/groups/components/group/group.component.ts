import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { GroupsModuleState } from '../../store';
import * as groupsActions from '../../store/groups.actions';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnDestroy {
  sub$: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<GroupsModuleState>) {
    this.sub$ = new Subscription();
    const route$ = this.route.params.subscribe((params) => {
      this.store.dispatch(groupsActions.loadGroup({ id: params.id }));
    });
    this.sub$.add(route$);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
