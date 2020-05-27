import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MainComponent } from './components';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent, NavigationComponent],
  imports: [CommonModule, MainRoutingModule, MatProgressSpinnerModule],
})
export class MainModule {}
