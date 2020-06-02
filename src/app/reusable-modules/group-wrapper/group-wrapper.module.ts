import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupWrapperComponent } from './components';

@NgModule({
  declarations: [GroupWrapperComponent],
  imports: [CommonModule],
  exports: [GroupWrapperComponent],
})
export class GroupWrapperModule {}
