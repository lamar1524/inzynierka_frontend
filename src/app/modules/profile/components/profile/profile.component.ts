import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentUser, AuthModuleState } from '@authorization/store';
import { IUser } from '@core/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectProfileData, selectProfileLoading, ProfileModuleState } from '../../store';
import * as profileActions from '../../store/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnDestroy {
  currentUser$: Observable<IUser>;
  profile$: Observable<IUser>;
  profileLoading$: Observable<boolean>;
  sub$: Subscription;

  constructor(private store: Store<AuthModuleState | ProfileModuleState>, private route: ActivatedRoute) {
    this.sub$ = new Subscription();
    const route$ = this.route.params.subscribe((params) => {
      if (params.id.length > 0) {
        this.store.dispatch(profileActions.loadProfileData({ userId: params.id }));
      }
    });
    this.sub$.add(route$);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.profile$ = this.store.select(selectProfileData);
    this.profileLoading$ = this.store.select(selectProfileLoading);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
