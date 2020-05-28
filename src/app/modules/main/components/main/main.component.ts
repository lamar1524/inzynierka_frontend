import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  constructor() {}
}
