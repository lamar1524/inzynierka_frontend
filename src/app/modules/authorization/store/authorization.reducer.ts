import { IUser } from '@core/interfaces/user.interface';
import { createReducer, on, Action } from '@ngrx/store';

import * as authActions from './authorization.actions';

export interface AuthModuleState {
  auth: AuthState;
}

export interface AuthState {
  loginLoading: boolean;
  currentUser: IUser;
}

export const initialState: AuthState = {
  loginLoading: false,
  currentUser: null,
};
export const AUTH_REDUCER = createReducer(
  initialState,
  on(authActions.login, (state: AuthState) => ({ ...state, loginLoading: true, currentUser: null })),
  on(authActions.loginSuccess, (state: AuthState, { user }) => ({ ...state, loginLoading: false, currentUser: user })),
  on(authActions.loginFailed, (state: AuthState) => ({ ...state, loginLoading: false })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return AUTH_REDUCER(state, action);
}
