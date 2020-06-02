import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrivateGroupsComponent } from './components';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [PrivateGroupsComponent],
  imports: [CommonModule, GroupsRoutingModule],
})
export class GroupsModule {}
