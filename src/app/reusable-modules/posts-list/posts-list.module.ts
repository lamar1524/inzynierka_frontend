import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PostWrapperModule } from '../post-wrapper';
import { PostsListComponent } from './components';

@NgModule({
  declarations: [PostsListComponent],
  imports: [CommonModule, PostWrapperModule, MatProgressSpinnerModule],
  exports: [PostsListComponent],
})
export class PostsListModule {}
