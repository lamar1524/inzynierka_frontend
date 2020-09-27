import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { PostWrapperModule } from '@reusable-modules/post-wrapper';
import { PostsListModule } from '@reusable-modules/posts-list';
import { STORE_FEATURES } from '../../consts';
import { AllPostsComponent, CommentComponent, SinglePostComponent } from './components';
import { PostsRoutingModule } from './posts-routing.module';
import { postsReducer, PostsEffects } from './store';

@NgModule({
  declarations: [AllPostsComponent, SinglePostComponent, CommentComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.posts, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PostsListModule,
    PostWrapperModule,
    MatProgressSpinnerModule,
    NgScrollbarModule,
    InfiniteScrollModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class PostsModule {}
