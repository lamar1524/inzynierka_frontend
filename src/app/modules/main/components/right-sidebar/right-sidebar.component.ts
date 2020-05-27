import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {
  constructor() {}
}
