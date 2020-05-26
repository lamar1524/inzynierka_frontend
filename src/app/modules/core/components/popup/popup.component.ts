import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { POPUP_STATE } from '../../enums';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  classObj;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.classObj = {
      'text--red': this.data.type === POPUP_STATE.ERROR,
      'text--white': this.data.type === POPUP_STATE.INFO,
      'text--green': this.data.type === POPUP_STATE.SUCCESS,
    };
  }
}
