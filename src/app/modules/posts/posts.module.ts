import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [AllPostsComponent],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
