import { createSelector } from '@ngrx/store';

import { AdminModuleState, AdminState } from './admin.reducers';

export const adminSelector = (state: AdminModuleState) => state.admin;

export const selectUsersLoading = createSelector(adminSelector, (state: AdminState) => state.usersLoading);
export const selectUsersList = createSelector(adminSelector, (state: AdminState) => state.usersList);
