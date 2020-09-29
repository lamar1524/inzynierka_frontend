import { Action, createReducer, on } from '@ngrx/store';

import * as adminActions from './admin.actions';

export interface AdminModuleState {
  admin: AdminState;
}

export interface AdminState {
  usersLoading: boolean;
}

export const initialState: AdminState = {
  usersLoading: false,
};

export const ADMIN_REDUCER = createReducer(
  initialState,
  on(adminActions.loadUsers, (state) => ({ ...state, usersLoading: true })),
  on(adminActions.loadUsersSuccess, (state) => ({ ...state, usersLoading: false })),
  on(adminActions.loadUsersFail, (state) => ({ ...state, usersLoading: false })),
);

export const adminReducer = (state: AdminState | undefined, action: Action) => ADMIN_REDUCER(state, action);
