import { createSelector } from '@ngrx/store';
import { GroupsModuleState, GroupsState } from './groups.reducer';

export const selectGroups = (state: GroupsModuleState) => state.groups;

export const selectPrivateGroupsLoading = createSelector(selectGroups, (state: GroupsState) => state.privateGroupsLoading);
export const selectPrivateGroups = createSelector(selectGroups, (state: GroupsState) => state.privateGroups);

export const selectGroupLoading = createSelector(selectGroups, (state: GroupsState) => state.groupLoading);
export const selectGroup = createSelector(selectGroups, (state: GroupsState) => state.group);

export const selectGroupPostsLoading = createSelector(selectGroups, (state: GroupsState) => state.groupsPostsLoading);
export const selectGroupPosts = createSelector(selectGroups, (state: GroupsState) => state.groupsPosts);

export const selectPostAdding = createSelector(selectGroups, (state: GroupsState) => state.postAdding);

export const selectAddingPostVisibility = createSelector(selectGroups, (state: GroupsState) => state.addingPostFormVisibility);

export const selectMembersLoading = createSelector(selectGroups, (state: GroupsState) => state.membersLoading);
export const selectMembers = createSelector(selectGroups, (state: GroupsState) => state.members);

export const selectMakingModerator = createSelector(selectGroups, (state: GroupsState) => state.makingModerator);

export const selectDroppingUser = createSelector(selectGroups, (state: GroupsState) => state.droppingUser);

export const selectPendingMembersLoading = createSelector(selectGroups, (state: GroupsState) => state.loadingPendingMembers);
export const selectPendingMembers = createSelector(selectGroups, (state: GroupsState) => state.pendingMembers);

export const selectPendingProcessing = createSelector(selectGroups, (state: GroupsState) => state.pendingProcessing);
