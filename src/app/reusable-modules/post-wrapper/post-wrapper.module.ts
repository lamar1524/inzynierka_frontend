import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { PostFormModule } from '../post-form';
import { PostWrapperComponent } from './components';

@NgModule({
  declarations: [PostWrapperComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    PostFormModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [PostWrapperComponent],
})
export class PostWrapperModule {}
