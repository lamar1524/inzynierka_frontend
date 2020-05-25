import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatSnackBarModule],
})
export class CoreModule {}
