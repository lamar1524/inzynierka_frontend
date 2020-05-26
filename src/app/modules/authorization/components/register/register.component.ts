import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTES } from '@core/consts';
import { IRoutes } from '@core/interfaces';
import { equalityValidator } from '@core/validators/equality.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup;
  routes: IRoutes;

  constructor() {
    this.registerForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl(null, [Validators.required, equalityValidator('password')]),
    });
    this.routes = ROUTES;
  }

  get firstName() {
    return this.registerForm.get('first_name');
  }

  get lastName() {
    return this.registerForm.get('last_name');
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

  submitRegister(): void {}
}
