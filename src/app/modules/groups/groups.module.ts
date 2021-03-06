import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';

import { GroupWrapperModule } from '@reusable-modules/group-wrapper';
import { PostFormModule } from '@reusable-modules/post-form';
import { PostsListModule } from '@reusable-modules/posts-list';
import { STORE_FEATURES } from '../../consts';
import { GroupComponent, PrivateGroupsComponent, SearchComponent } from './components';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { groupsReducer, GroupsEffects } from './store';

@NgModule({
  declarations: [PrivateGroupsComponent, GroupComponent, SearchComponent, CreateGroupComponent],
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
    ReactiveFormsModule,
    MatTooltipModule,
    NgScrollbarModule,
    InfiniteScrollModule,
    MatIconModule,
    FormsModule,
  ],
})
export class GroupsModule {}
