import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthorizationRoutingModule } from '@authorization/authorization-routing.module';
import { LoginGuard } from '@authorization/guards';
import { AuthInterceptor } from '@authorization/interceptors';
import { STORE_FEATURES } from '@core/consts';
import { LoginComponent, RegisterComponent } from './components';
import { AuthService } from './services';
import { authReducer, AuthorizationEffects } from './store';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(STORE_FEATURES.auth, authReducer),
    EffectsModule.forFeature([AuthorizationEffects]),
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    AuthorizationRoutingModule,
  ],
  providers: [
    AuthService,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthorizationModule {}