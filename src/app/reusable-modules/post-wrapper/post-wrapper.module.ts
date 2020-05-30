import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PostWrapperComponent } from './components';

@NgModule({
  declarations: [PostWrapperComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, FormsModule, MatProgressSpinnerModule],
  exports: [PostWrapperComponent],
})
export class PostWrapperModule {}
