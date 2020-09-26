import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '../../consts';
import { LeftSidebarComponent, MainComponent, NavigationComponent, RightSidebarComponent } from './components';
import { MainRoutingModule } from './main-routing.module';
import { mainReducer, MainEffects } from './store';

@NgModule({
  declarations: [MainComponent, NavigationComponent, LeftSidebarComponent, RightSidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    StoreModule.forFeature(STORE_FEATURES.main, mainReducer),
    EffectsModule.forFeature([MainEffects]),
  ],
})
export class MainModule {}
