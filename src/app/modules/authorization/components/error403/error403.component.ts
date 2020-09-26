import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTES } from '../../../../consts';
import { IRoutes } from '../../../../interfaces';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error403Component {
  readonly routes: IRoutes;

  constructor() {
    this.routes = ROUTES;
  }
}
