import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/consts';
import { AllPostsComponent, SinglePostComponent } from './components';

const routes: Routes = [
  {
    path: ROUTES.allPosts.name,
    component: AllPostsComponent,
  },
  {
    path: ROUTES.singlePost.name + ':id',
    component: SinglePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
