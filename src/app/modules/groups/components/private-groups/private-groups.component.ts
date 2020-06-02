import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-groups',
  templateUrl: './private-groups.component.html',
  styleUrls: ['./private-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateGroupsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
