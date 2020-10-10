import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthModuleState, loadUser, selectCurrentUser } from '@authorization/store';
import { filter, map } from 'rxjs/operators';
import { USER_ROLE } from '../../../enums';
import { Observable } from 'rxjs';
import { ROUTES } from '../../../consts';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AuthModuleState>, private _router: Router) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(loadUser());
    return this.store.select(selectCurrentUser).pipe(
      filter((user) => !!user),
      map((user) => {
        if (user.role === USER_ROLE.ADMIN) {
          return true;
        }
        this._router.navigate([ROUTES.home.path]);
        return false;
      }),
    );
  }
}
