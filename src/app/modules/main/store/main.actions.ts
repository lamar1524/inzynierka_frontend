import { IGroup } from '@core/interfaces/group.interface';
import { createAction, props } from '@ngrx/store';

export const showNav = createAction('[Main] Show nav');
export const hideNav = createAction('[Main] Hide nav');
export const toggleNav = createAction('[Main] toggle nav');

export const loadBaseGroups = createAction('[Main] Load base groups');
export const loadBaseGroupsSuccess = createAction('[Main] Load base groups success', props<{ baseGroups: IGroup[] }>());
export const loadBaseGroupsFail = createAction('[Main] Load base groups fail');
