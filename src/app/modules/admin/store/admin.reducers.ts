import { Action, createReducer, on } from '@ngrx/store';

import * as adminActions from './admin.actions';
import { IResponseUsers } from '../../../interfaces';

export interface AdminModuleState {
  admin: AdminState;
}

export interface AdminState {
  usersLoading: boolean;
  usersList: IResponseUsers;
}

export const initialState: AdminState = {
  usersLoading: false,
  usersList: null,
};

export const ADMIN_REDUCER = createReducer(
  initialState,
  on(adminActions.loadUsers, (state) => ({ ...state, usersLoading: true })),
  on(adminActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    usersLoading: false,
    usersList: state.usersList ? { ...state.usersList, users: [...state.usersList.users, ...users.users] } : { ...users },
  })),
  on(adminActions.loadUsersFail, (state) => ({ ...state, usersLoading: false })),
  on(adminActions.clearUsersList, (state) => ({ ...state, usersList: null })),
);

export const adminReducer = (state: AdminState | undefined, action: Action) => ADMIN_REDUCER(state, action);
