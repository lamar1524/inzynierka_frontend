import { createAction } from '@ngrx/store';

export const loadUsers = createAction('[Admin] Load users');
export const loadUsersSuccess = createAction('[Admin] Load users success');
export const loadUsersFail = createAction('[Admin] Load users fail');
