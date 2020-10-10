import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../../consts';
import { GroupComponent, PrivateGroupsComponent, SearchComponent } from './components';

const routes: Routes = [
  { path: ROUTES.privateGroups.name, component: PrivateGroupsComponent },
  { path: ROUTES.singleGroup.name + '/:id', component: GroupComponent },
  { path: ROUTES.search.name + '/:phrase', component: SearchComponent },
  { path: ROUTES.search.name, redirectTo: ROUTES.search.path + '?', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
