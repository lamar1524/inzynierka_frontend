import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { STORE_FEATURES } from '../../consts';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminEffects, adminReducer } from './store';
import { UsersListComponent } from './components';
import { AdminGuard } from './guards/admin.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.admin, adminReducer),
    EffectsModule.forFeature([AdminEffects]),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgScrollbarModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [AdminGuard],
})
export class AdminModule {}
