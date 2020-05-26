import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts/store.features.const';
import { LoginComponent } from './components';
import { AuthService } from './services';
import { authReducer } from './store/authorization.reducer';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(STORE_FEATURES.auth, [authReducer]),
    EffectsModule.forFeature([]),
    MatInputModule,
    MatButtonModule,
  ],
  providers: [AuthService],
})
export class AuthorizationModule {}
