import { createAction, props } from '@ngrx/store';

import { IUser } from '../../../interfaces';
import { IUpdateUser } from '../../../interfaces';

export const loadProfileData = createAction('[Profile] Load profile data', props<{ userId: number }>());
export const loadProfileDataSuccess = createAction('[Profile] Load profile data success', props<{ user: IUser }>());
export const loadProfileDataFail = createAction('[Profile] Load profile data fail');

export const editProfileData = createAction(
  '[Profile] Send profile to update',
  props<{ user: IUpdateUser | FormData; refreshAction: () => void }>(),
);
export const editProfileDataSuccess = createAction('[Profile] Send profile to update success', props<{ user: IUser }>());
export const editProfileDataFail = createAction('[Profile] Send profile to update fail');

export const fetchOrCreateThread = createAction('[Profile] Get or create thread', props<{ user2Id: number }>());
export const fetchOrCreateThreadSuccess = createAction('[Profile] Get or create thread success');
export const fetchOrCreateThreadFail = createAction('[Profile] Get or create thread fail');
