import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { IDialogData } from '../../interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnDestroy {
  isProcessing: boolean;
  isProcessing$: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private cdRef: ChangeDetectorRef,
  ) {
    this.isProcessing = false;
    this.isProcessing$ = this.data.loadingSelect.subscribe((process) => {
      if (this.isProcessing && !process) {
        this.isProcessing = process;
        this.dialogRef.close();
      } else {
        this.isProcessing = process;
      }
      this.cdRef.markForCheck();
    });
  }

  onAccept() {
    this.data.onAcceptCallback();
  }

  onDecline() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.isProcessing$.unsubscribe();
  }
}
