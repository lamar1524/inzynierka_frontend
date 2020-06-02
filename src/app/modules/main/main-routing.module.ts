import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/consts';
import { MainComponent } from './components';

const routes: Routes = [
  {
    path: ROUTES.home.name,
    component: MainComponent,
    children: [
      { path: '', redirectTo: ROUTES.posts.path, pathMatch: 'full' },
      { path: ROUTES.posts.name, loadChildren: () => import('../posts/posts.module').then((mod) => mod.PostsModule) },
      { path: ROUTES.groupsModule.name, loadChildren: () => import('../groups/groups.module').then((mod) => mod.GroupsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
