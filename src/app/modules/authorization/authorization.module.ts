import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [CommonModule],
  providers: [AuthService],
})
export class AuthorizationModule {}
