import { createAction, props } from '@ngrx/store';

import { ILoginUser, IUser } from '@core/interfaces/user.interface';

export const login = createAction('[Authorization] Login user', props<{ data: ILoginUser }>());
export const loginSuccess = createAction('[Authorization] Login user success', props<{ user: IUser }>());
export const loginFailed = createAction('[Authorization] Login user fail');
