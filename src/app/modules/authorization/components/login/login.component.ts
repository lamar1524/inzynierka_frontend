import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectLoginLoading } from '@authorization/store';
import { Store } from '@ngrx/store';

import { AuthModuleState } from '@authorization/store/authorization.reducer';
import { ILoginUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as authActions from '../../store/authorization.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(private store: Store<AuthModuleState>, private cdRef: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.loading$ = this.store.select(selectLoginLoading).pipe(
      tap((loading) => {
        loading ? this.loginForm.disable() : this.loginForm.enable();
        this.cdRef.markForCheck();
      }),
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get data(): ILoginUser {
    return {
      username: this.email.value,
      password: this.password.value,
    };
  }

  get ableToSend() {
    return this.loginForm.enabled && this.loginForm.valid;
  }

  submitLogin() {
    this.store.dispatch(authActions.login({ data: this.data }));
  }
}
