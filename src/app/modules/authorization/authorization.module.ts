import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './components';
import { AuthService } from './services';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  providers: [AuthService],
})
export class AuthorizationModule {}
