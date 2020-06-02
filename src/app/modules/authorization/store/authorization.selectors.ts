import { createSelector } from '@ngrx/store';

import { AuthModuleState, AuthState } from './authorization.reducer';

export const authSelector = (state: AuthModuleState) => state.auth;

export const selectLoginLoading = createSelector(authSelector, (state: AuthState) => state.loginLoading);
export const selectCurrentUser = createSelector(authSelector, (state: AuthState) => state.currentUser);

export const selectRegisterLoading = createSelector(authSelector, (state: AuthState) => state.registerLoading);
