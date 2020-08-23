import { createAction, props } from '@ngrx/store';

import { ILoginUser, IRegisterUser, IUser } from '../../../interfaces';

export const login = createAction('[Authorization] Login user', props<{ data: ILoginUser }>());
export const loginSuccess = createAction('[Authorization] Login user success', props<{ user: IUser }>());
export const loginFail = createAction('[Authorization] Login user fail');

export const register = createAction('[Authorization] Register user', props<{ data: IRegisterUser }>());
export const registerSuccess = createAction('[Authorization] Register user success');
export const registerFail = createAction('[Authorization] Register user fail');

export const loadUser = createAction('[Authorization] Load user');
export const loadUserSuccess = createAction('[Authorization] Load user success', props<{ user: IUser }>());
export const loadUserFail = createAction('[Authorization] Load user fail');

export const logoutUser = createAction('[Authorization] Logout user');
export const logoutUserSuccess = createAction('[Authorization] Logout user success');
