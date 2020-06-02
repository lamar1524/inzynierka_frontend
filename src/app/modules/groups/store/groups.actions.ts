import { createAction, props } from '@ngrx/store';

import { IResponseGroups } from '@core/interfaces';

export const loadPrivateGroups = createAction('[Groups] Load private groups', props<{ url: string | null }>());
export const loadPrivateGroupsSuccess = createAction('[Groups] Load private groups success', props<{ groups: IResponseGroups }>());
export const loadPrivateGroupsFail = createAction('[Groups] Load private groups fail');
