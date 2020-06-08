import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { STORE_FEATURES } from '@core/consts';
import { GroupWrapperModule } from '@reusable-modules/group-wrapper';
import { PostFormModule } from '@reusable-modules/post-form';
import { PostsListModule } from '@reusable-modules/posts-list';
import { GroupComponent, PrivateGroupsComponent, SearchComponent } from './components';
import { GroupsRoutingModule } from './groups-routing.module';
import { groupsReducer } from './store';
import { GroupsEffects } from './store/groups.effects';

@NgModule({
  declarations: [PrivateGroupsComponent, GroupComponent, SearchComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.groups, groupsReducer),
    EffectsModule.forFeature([GroupsEffects]),
    GroupWrapperModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTabsModule,
    PostsListModule,
    PostFormModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class GroupsModule {}
