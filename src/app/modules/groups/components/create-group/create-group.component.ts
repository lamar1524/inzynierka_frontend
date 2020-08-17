import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  groupCreationForm: FormGroup;

  constructor(private store: Store<GroupsModuleState>) {
    this.groupCreationForm = new FormGroup({
      groupName: new FormControl(null, Validators.required),
    });
  }

  get groupName() {
    return this.groupCreationForm.get('groupName');
  }

  hideGroupCreationForm($event: MouseEvent) {
    this.store.dispatch(groupsActions.hideGroupCreationForm());
  }

  preventEventPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  // TODO - implement group creation
  handleFormSubmit() {
    console.log('placeholder');
  }
}
