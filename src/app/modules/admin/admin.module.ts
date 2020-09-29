import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { STORE_FEATURES } from '../../consts';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminEffects, adminReducer } from './store';
import { UsersListComponent } from './components';
import { AdminGuard } from './guards/admin.guard';
import { MatTableModule } from '@angular/material/table';

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
  ],
  providers: [AdminGuard],
})
export class AdminModule {}
