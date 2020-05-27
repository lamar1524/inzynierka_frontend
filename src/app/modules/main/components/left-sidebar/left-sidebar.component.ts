import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebarComponent {
  constructor() {}
}
