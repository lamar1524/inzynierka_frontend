import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts';
import { AllPostsComponent, PostWrapperComponent } from './components';
import { PostsRoutingModule } from './posts-routing.module';
import { postsReducer, PostsEffects } from './store';

@NgModule({
  declarations: [AllPostsComponent, PostWrapperComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.posts, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
