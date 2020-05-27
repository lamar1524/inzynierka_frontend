import { createAction, props } from '@ngrx/store';

import { ILoginUser, IRegisterUser, IUser } from '@core/interfaces';

export const login = createAction('[Authorization] Login user', props<{ data: ILoginUser }>());
export const loginSuccess = createAction('[Authorization] Login user success', props<{ user: IUser }>());
export const loginFailed = createAction('[Authorization] Login user fail');

export const register = createAction('[Authorization] Register user', props<{ data: IRegisterUser }>());
export const registerSuccess = createAction('[Authorization] Register user success');
export const registerFailed = createAction('[Authorization] Register user fail');

export const loadUser = createAction('[Authorization] Load user');
export const loadUserSuccess = createAction('[Authorization] Load user success', props<{ user: IUser }>());
export const loadUserFailed = createAction('[Authorization] Load user fail');
