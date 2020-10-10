import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { IGroup } from '../../../../interfaces';

@Component({
  selector: 'app-group-wrapper',
  templateUrl: './group-wrapper.component.html',
  styleUrls: ['./group-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupWrapperComponent implements OnInit {
  @Input() group: IGroup;
  @Input() route: string;

  constructor() {}

  ngOnInit(): void {}
}
