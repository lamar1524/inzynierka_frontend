import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/consts';
import { LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  { path: ROUTES.login.name, component: LoginComponent },
  { path: ROUTES.register.name, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
