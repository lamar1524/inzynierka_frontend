import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import * as authActions from '@authorization/store/authorization.actions';
import { ROUTES } from '../../../../consts';
import { IRoutes, IUser } from '../../../../interfaces';
import { hideNav, selectNavVisibility, toggleNav, MainModuleState } from '../../store';
import { USER_ROLE } from '../../../../enums';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnDestroy {
  currentUser$: Observable<IUser>;
  private sub: Subscription;
  navVisibility: Observable<boolean>;
  readonly routes: IRoutes;

  constructor(private store: Store<AuthModuleState | MainModuleState>) {
    this.sub = new Subscription();
    this.store.dispatch(authActions.loadUser());
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.navVisibility = this.store.select(selectNavVisibility);
    this.routes = ROUTES;
  }

  get roles() {
    return USER_ROLE;
  }

  toggleNav() {
    this.store.dispatch(toggleNav());
  }

  closeNav() {
    this.store.dispatch(hideNav());
  }

  logout() {
    this.closeNav();
    this.store.dispatch(authActions.logoutUser());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
