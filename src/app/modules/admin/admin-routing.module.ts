import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../../consts';
import { UsersListComponent } from './components';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: ROUTES.usersList.name, component: UsersListComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: ROUTES.usersList.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
