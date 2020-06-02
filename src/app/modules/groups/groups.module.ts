import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts';
import { GroupWrapperModule } from '@reusable-modules/group-wrapper';
import { PrivateGroupsComponent } from './components';
import { GroupsRoutingModule } from './groups-routing.module';
import { groupsReducer } from './store';
import { GroupsEffects } from './store/groups.effects';

@NgModule({
  declarations: [PrivateGroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.groups, groupsReducer),
    EffectsModule.forFeature([GroupsEffects]),
    GroupWrapperModule
  ]
})
export class GroupsModule {}
