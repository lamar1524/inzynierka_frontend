import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PopupComponent } from './components';
import { GroupsService, MessagesService, PopupService, PostsService } from './services';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatSnackBarModule, HttpClientModule],
  providers: [PopupService, GroupsService, MessagesService, PostsService],
  exports: [],
})
export class CoreModule {}
