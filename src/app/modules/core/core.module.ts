import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts';
import { DialogComponent, PopupComponent } from './components';
import { DialogService, GroupsService, MessagesService, PopupService, PostsService } from './services';
import { coreReducer, CoreEffects } from './store';

@NgModule({
  declarations: [PopupComponent, DialogComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forFeature(STORE_FEATURES.core, coreReducer),
    EffectsModule.forFeature([CoreEffects]),
  ],
  providers: [PopupService, GroupsService, MessagesService, PostsService, DialogService],
  exports: [],
})
export class CoreModule {}
