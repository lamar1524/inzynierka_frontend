import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/consts';
import { AllPostsComponent } from './components';

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
