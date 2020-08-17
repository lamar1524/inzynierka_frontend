import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectGroupCreationLoading, GroupsModuleState } from '../../store';
import * as groupsActions from '../../store/groups.actions';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupComponent {
  groupCreationForm: FormGroup;
  groupCreationLoading$: Observable<boolean>;

  constructor(private store: Store<GroupsModuleState>) {
    this.groupCreationForm = new FormGroup({
      groupName: new FormControl(null, Validators.required),
    });
    this.groupCreationLoading$ = this.store.select(selectGroupCreationLoading);
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
    this.store.dispatch(
      groupsActions.createGroup({
        groupName: this.groupName.value,
        onSuccessCallback: () => {
          this.store.dispatch(groupsActions.loadPrivateGroups({ url: null }));
          this.store.dispatch(groupsActions.hideGroupCreationForm());
        },
      }),
    );
  }
}
