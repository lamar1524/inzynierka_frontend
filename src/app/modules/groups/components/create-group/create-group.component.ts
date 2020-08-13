import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { GroupsModuleState } from '../../store';
import * as groupsActions from '../../store/groups.actions';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupComponent {
  constructor(private store: Store<GroupsModuleState>) {}

  hideGroupCreationForm($event: MouseEvent) {
    this.store.dispatch(groupsActions.hideGroupCreationForm());
  }
}
