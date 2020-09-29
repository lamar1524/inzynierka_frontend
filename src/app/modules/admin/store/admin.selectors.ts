import { AdminModuleState, AdminState } from './admin.reducers';
import { createSelector } from '@ngrx/store';

export const adminSelector = (state: AdminModuleState) => state.admin;

export const selectUsersLoading = createSelector(adminSelector, (state: AdminState) => state.usersLoading);
