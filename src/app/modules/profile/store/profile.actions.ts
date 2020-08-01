import { IUser } from '@core/interfaces';
import { IUpdateUser } from '@core/interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const loadProfileData = createAction('[Profile] Load profile data', props<{ userId: number }>());
export const loadProfileDataSuccess = createAction('[Profile] Load profile data success', props<{ user: IUser }>());
export const loadProfileDataFail = createAction('[Profile] Load profile data fail');

export const editProfileData = createAction('[Profile] Send profile to update', props<{ user: IUpdateUser }>());
export const editProfileDataSuccess = createAction('[Profile] Send profile to update success', props<{ user: IUser }>());
export const editProfileDataFail = createAction('[Profile] Send profile to update fail');
