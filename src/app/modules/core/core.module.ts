import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PopupComponent } from './components';
import { PopupService } from './services';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatSnackBarModule],
  providers: [PopupService],
})
export class CoreModule {}
