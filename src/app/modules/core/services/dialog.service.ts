import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogData } from '@core/interfaces/dialog.interface';

import { DialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  showDialog(data: IDialogData) {
    this.matDialog.open(DialogComponent, {
      width: '350px',
      height: '200px',
      data,
    });
  }
}
