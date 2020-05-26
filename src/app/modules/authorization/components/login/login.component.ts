import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthModuleState } from '@authorization/store/authorization.reducer';
import { ILoginUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import * as authActions from '../../store/authorization.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(private store: Store<AuthModuleState>) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

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

  submitLogin() {
    this.store.dispatch(authActions.login({ data: this.data }));
  }
}
