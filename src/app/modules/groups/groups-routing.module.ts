import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/consts';
import { PrivateGroupsComponent } from './components';

const routes: Routes = [{ path: ROUTES.privateGroups.name, component: PrivateGroupsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
