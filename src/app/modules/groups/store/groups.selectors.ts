import { createSelector } from '@ngrx/store';
import { GroupsModuleState, GroupsState } from './groups.reducer';

export const selectGroups = (state: GroupsModuleState) => state.groups;

export const selectPrivateGroupsLoading = createSelector(selectGroups, (state: GroupsState) => state.privateGroupsLoading);
export const selectPrivateGroups = createSelector(selectGroups, (state: GroupsState) => state.privateGroups);

export const selectGroupLoading = createSelector(selectGroups, (state: GroupsState) => state.groupLoading);
export const selectGroup = createSelector(selectGroups, (state: GroupsState) => state.group);

export const selectGroupPostsLoading = createSelector(selectGroups, (state: GroupsState) => state.groupsPostsLoading);
export const selectGroupPosts = createSelector(selectGroups, (state: GroupsState) => state.groupsPosts);
