import { AuthModuleState, AuthState } from '@authorization/store/authorization.reducer';
import { createSelector } from '@ngrx/store';

export const authSelector = (state: AuthModuleState) => state.auth;

export const selectLoginLoading = createSelector(authSelector, (state: AuthState) => state.loginLoading);
export const selectCurrentUser = createSelector(authSelector, (state: AuthState) => state.currentUser);
