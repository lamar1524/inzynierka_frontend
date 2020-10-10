import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ROUTES } from '../../../../consts';
import { IRoutes } from '../../../../interfaces';
import { equalityValidator } from '../../../../validators/equality.validator';
import { selectRegisterLoading, AuthModuleState } from '../../store';
import * as authActions from '../../store/authorization.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup;
  routes: IRoutes;
  loading$: Observable<boolean>;

  constructor(private store: Store<AuthModuleState>, private cdRef: ChangeDetectorRef) {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl(null, [Validators.required, equalityValidator('password')]),
    });
    this.routes = ROUTES;
    this.loading$ = this.store.select(selectRegisterLoading).pipe(
      tap((loading) => {
        loading ? this.registerForm.disable() : this.registerForm.enable();
        this.cdRef.markForCheck();
      }),
    );
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  submitRegister(): void {
    const { firstName, lastName, email, password } = this.registerForm.value;
    this.store.dispatch(authActions.register({ data: { firstName, lastName, email, password } }));
  }
}
