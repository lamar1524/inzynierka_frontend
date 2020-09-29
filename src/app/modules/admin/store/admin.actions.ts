import { createAction, props } from '@ngrx/store';
import { IResponseUsers } from '../../../interfaces';

export const loadUsers = createAction('[Admin] Load users', props<{ url: string | null }>());
export const loadUsersSuccess = createAction('[Admin] Load users success', props<{ users: IResponseUsers }>());
export const loadUsersFail = createAction('[Admin] Load users fail');

export const clearUsersList = createAction('[Admin] Clear users');
