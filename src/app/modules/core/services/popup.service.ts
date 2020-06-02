import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PopupComponent } from '../components';
import { POPUP_STATE } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private snackBar: MatSnackBar) {}

  showPopup(message: string, state: POPUP_STATE, duration: number = 3000) {
    this.snackBar.openFromComponent(PopupComponent, {
      duration: 3000,
      data: {
        text: message,
        type: state,
      },
      panelClass: ['mat-toolbar'],
    });
  }

  error = (message: string, duration: number = 3000) => this.showPopup(message, POPUP_STATE.ERROR, duration);

  info = (message: string, duration: number = 3000) => this.showPopup(message, POPUP_STATE.INFO, duration);

  success = (message: string, duration: number = 3000) => this.showPopup(message, POPUP_STATE.SUCCESS, duration);
}
