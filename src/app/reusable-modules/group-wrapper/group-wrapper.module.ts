import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GroupWrapperComponent } from './components';

@NgModule({
  declarations: [GroupWrapperComponent],
  imports: [CommonModule, RouterModule],
  exports: [GroupWrapperComponent],
})
export class GroupWrapperModule {}
