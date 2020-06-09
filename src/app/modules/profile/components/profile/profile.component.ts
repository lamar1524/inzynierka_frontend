import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { IUser } from '@core/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnDestroy {
  currentUser$: Observable<IUser>;
  sub$: Subscription;

  constructor(private store: Store<AuthModuleState>, private route: ActivatedRoute) {
    this.sub$ = new Subscription();
    const route$ = this.route.params.subscribe((params) => {
      console.log(params);
    });
    this.sub$.add(route$);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
