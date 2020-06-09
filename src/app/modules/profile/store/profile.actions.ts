import { IUser } from '@core/interfaces';
import { createAction, props } from '@ngrx/store';

export const loadProfileData = createAction('[Profile] Load profile data', props<{ userId: number }>());
export const loadProfileDataSuccess = createAction('[Profile] Load profile data success', props<{ user: IUser }>());
export const loadProfileDataFail = createAction('[Profile] Load profile data fail');
