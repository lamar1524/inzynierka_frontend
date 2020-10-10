import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IDialogData } from '../../../interfaces';
import { DialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  showDialog(data: IDialogData) {
    this.matDialog.open(DialogComponent, {
      width: '400px',
      height: '250px',
      data,
      panelClass: 'app-dialog-container',
    });
  }
}
