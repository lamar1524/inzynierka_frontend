import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '@core/consts';

import { AllPostsComponent } from './components/all-posts/all-posts.component';

const routes: Routes = [
  {
    path: ROUTES.allPosts.name,
    component: AllPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
