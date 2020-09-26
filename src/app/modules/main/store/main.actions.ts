import { createAction, props } from '@ngrx/store';

import { IResponseUsers } from '../../../interfaces';
import { IGroup } from '../../../interfaces/group.interface';

export const showNav = createAction('[Main] Show nav');
export const hideNav = createAction('[Main] Hide nav');
export const toggleNav = createAction('[Main] toggle nav');

export const loadBaseGroups = createAction('[Main] Load base groups');
export const loadBaseGroupsSuccess = createAction('[Main] Load base groups success', props<{ baseGroups: IGroup[] }>());
export const loadBaseGroupsFail = createAction('[Main] Load base groups fail');

export const loadFriendsList = createAction('[Main] Load friends', props<{ url: string | null }>());
export const loadFriendsListSuccess = createAction('[Main] Load friends success', props<{ users: IResponseUsers }>());
export const loadFriendsListFail = createAction('[Main] Load friends fail');
