import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostWrapperModule } from '../post-wrapper';
import { PostsListComponent } from './components';

@NgModule({
  declarations: [PostsListComponent],
  imports: [CommonModule, PostWrapperModule],
  exports: [PostsListComponent],
})
export class PostsListModule {}
