import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatIconModule,
    NgScrollbarModule,
    InfiniteScrollModule,
    MatTooltipModule,
  ],
})
export class MainModule {}
