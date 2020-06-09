import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts';
import { ProfileComponent } from './components';
import { ProfileRoutingModule } from './profile-routing.module';
import { profileReducer, ProfileEffects } from './store';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.profile, profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class ProfileModule {}
