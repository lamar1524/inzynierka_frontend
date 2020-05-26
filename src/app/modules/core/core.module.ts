import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PopupComponent } from './components/popup/popup.component';
import { PopupService } from './services/popup.service';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatSnackBarModule],
  providers: [PopupService],
})
export class CoreModule {}
