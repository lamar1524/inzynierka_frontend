import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PopupComponent } from '../components';
import { POPUP_STATE } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private snackBar: MatSnackBar) {}

  showPopup(message: string, state: POPUP_STATE) {
    this.snackBar.openFromComponent(PopupComponent, {
      duration: 3000,
      data: {
        text: message,
        type: state,
      },
      panelClass: ['mat-toolbar'],
    });
  }

  error = (message: string) => this.showPopup(message, POPUP_STATE.ERROR);

  info = (message: string) => this.showPopup(message, POPUP_STATE.INFO);

  success = (message: string) => this.showPopup(message, POPUP_STATE.SUCCESS);
}
