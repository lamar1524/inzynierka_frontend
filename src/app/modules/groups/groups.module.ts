import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts';
import { GroupWrapperModule } from '@reusable-modules/group-wrapper';
import { PostWrapperModule } from '@reusable-modules/post-wrapper';
import { GroupComponent, PrivateGroupsComponent } from './components';
import { GroupsRoutingModule } from './groups-routing.module';
import { groupsReducer } from './store';
import { GroupsEffects } from './store/groups.effects';

@NgModule({
  declarations: [PrivateGroupsComponent, GroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.groups, groupsReducer),
    EffectsModule.forFeature([GroupsEffects]),
    GroupWrapperModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTabsModule,
    PostWrapperModule
  ]
})
export class GroupsModule {}
