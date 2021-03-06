import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '../../consts';
import { ProfileComponent } from './components';
import { ProfileRoutingModule } from './profile-routing.module';
import { profileReducer, ProfileEffects } from './store';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.profile, profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class ProfileModule {}
