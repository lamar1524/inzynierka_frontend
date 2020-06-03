import { CoreModuleState, CoreState } from '@core/store/core.reducers';
import { createSelector } from '@ngrx/store';

export const selectCore = (state: CoreModuleState) => state.core;

export const selectEditingPost = createSelector(selectCore, (state: CoreState) => state.postEditing);
export const selectDeletingPost = createSelector(selectCore, (state: CoreState) => state.postDeleting);
