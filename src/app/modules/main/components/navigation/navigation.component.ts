import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import * as authActions from '@authorization/store/authorization.actions';
import { IUser } from '@core/interfaces';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnDestroy {
  currentUser$: Observable<IUser>;
  private sub: Subscription;

  constructor(private store: Store<AuthModuleState>) {
    this.sub = new Subscription();
    const temp = this.store
      .select(selectCurrentUser)
      .pipe(first())
      .subscribe((user) => {
        if (user === null) {
          this.store.dispatch(authActions.loadUser());
        }
        this.loadUser();
      });
    this.sub.add(temp);
  }

  loadUser() {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
