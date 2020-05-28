import { createReducer, on, Action } from '@ngrx/store';

import { IUser } from '@core/interfaces/user.interface';
import * as authActions from './authorization.actions';

export interface AuthModuleState {
  auth: AuthState;
}

export interface AuthState {
  loginLoading: boolean;
  currentUser: IUser;
  registerLoading: boolean;
  userLoading: boolean;
}

export const initialState: AuthState = {
  loginLoading: false,
  currentUser: null,
  registerLoading: false,
  userLoading: false,
};

export const AUTH_REDUCER = createReducer(
  initialState,
  on(authActions.login, (state: AuthState) => ({ ...state, loginLoading: true, currentUser: null })),
  on(authActions.loginSuccess, (state: AuthState, { user }) => ({ ...state, loginLoading: false, currentUser: user })),
  on(authActions.loginFail, (state: AuthState) => ({ ...state, loginLoading: false })),

  on(authActions.register, (state) => ({ ...state, registerLoading: true })),
  on(authActions.registerSuccess, (state) => ({ ...state, registerLoading: false })),
  on(authActions.registerFail, (state) => ({ ...state, registerLoading: false })),

  on(authActions.loadUser, (state) => ({ ...state, userLoading: true })),
  on(authActions.loadUserSuccess, (state, { user }) => ({ ...state, userLoading: false, currentUser: user })),
  on(authActions.loadUserFail, (state) => ({ ...state, userLoading: false })),

  on(authActions.logoutUser, (state) => ({ ...state, currentUser: null })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return AUTH_REDUCER(state, action);
}
