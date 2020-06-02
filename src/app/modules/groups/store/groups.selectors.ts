import { createSelector } from '@ngrx/store';
import { GroupsModuleState, GroupsState } from './groups.reducer';

export const selectGroups = (state: GroupsModuleState) => state.groups;

export const selectPrivateGroupsLoading = createSelector(selectGroups, (state: GroupsState) => state.privateGroupsLoading);
export const selectPrivateGroups = createSelector(selectGroups, (state: GroupsState) => state.privateGroups);
