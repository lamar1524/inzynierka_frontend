import { Action, createReducer, on } from '@ngrx/store';

import * as adminActions from './admin.actions';
import { IResponseUsers } from '../../../interfaces';

export interface AdminModuleState {
  admin: AdminState;
}

export interface AdminState {
  usersLoading: boolean;
  usersList: IResponseUsers;
  activityToggleLoading: boolean;
  settingRoleLoading: boolean;
}

export const initialState: AdminState = {
  usersLoading: false,
  usersList: null,
  activityToggleLoading: false,
  settingRoleLoading: false,
};

export const ADMIN_REDUCER = createReducer(
  initialState,
  on(adminActions.loadUsers, (state) => ({ ...state, usersLoading: true })),
  on(adminActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    usersLoading: false,
    usersList: state.usersList ? { ...users, users: [...state.usersList.users, ...users.users] } : { ...users },
  })),
  on(adminActions.loadUsersFail, (state) => ({ ...state, usersLoading: false })),
  on(adminActions.clearUsersList, (state) => ({ ...state, usersList: null })),

  on(adminActions.toggleUserActivity, (state) => ({ ...state, activityToggleLoading: true })),
  on(adminActions.toggleUserActivitySuccess, (state) => ({ ...state, activityToggleLoading: false })),
  on(adminActions.toggleUserActivityFail, (state) => ({ ...state, activityToggleLoading: false })),

  on(adminActions.setUserRole, (state) => ({ ...state, settingRoleLoading: true })),
  on(adminActions.setUserRoleSuccess, (state) => ({ ...state, settingRoleLoading: false })),
  on(adminActions.setUserRoleFail, (state) => ({ ...state, settingRoleLoading: false })),
);

export const adminReducer = (state: AdminState | undefined, action: Action) => ADMIN_REDUCER(state, action);
