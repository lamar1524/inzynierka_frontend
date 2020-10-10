import { createAction, props } from '@ngrx/store';
import { IResponseUsers } from '../../../interfaces';

export const loadUsers = createAction('[Admin] Load users', props<{ url: string | null }>());
export const loadUsersSuccess = createAction('[Admin] Load users success', props<{ users: IResponseUsers }>());
export const loadUsersFail = createAction('[Admin] Load users fail');

export const clearUsersList = createAction('[Admin] Clear users');

export const toggleUserActivity = createAction('[Admin] Toggle user activity', props<{ refreshAction: () => void; userId: number }>());
export const toggleUserActivitySuccess = createAction('[Admin] Toggle user activity success');
export const toggleUserActivityFail = createAction('[Admin] Toggle user activity fail');
