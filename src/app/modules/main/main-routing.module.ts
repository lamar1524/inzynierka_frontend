import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@authorization/guards';

import { ROUTES } from '../../consts';
import { MainComponent } from './components';

const routes: Routes = [
  {
    path: ROUTES.home.name,
    component: MainComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: ROUTES.posts.path, pathMatch: 'full' },
      { path: ROUTES.posts.name, loadChildren: () => import('../posts/posts.module').then((mod) => mod.PostsModule) },
      { path: ROUTES.groupsModule.name, loadChildren: () => import('../groups/groups.module').then((mod) => mod.GroupsModule) },
      { path: ROUTES.profile.name, loadChildren: () => import('../profile/profile.module').then((mod) => mod.ProfileModule) },
      { path: ROUTES.chatModule.name, loadChildren: () => import('../chat/chat.module').then((mod) => mod.ChatModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
