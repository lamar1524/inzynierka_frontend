import { createAction, props, Action } from '@ngrx/store';

import { IGroup, IResponseGroups, IResponsePosts, IResponseUsers } from '../../../interfaces';

export const loadPrivateGroups = createAction('[Groups] Load private groups', props<{ url: string | null }>());
export const loadPrivateGroupsSuccess = createAction('[Groups] Load private groups success', props<{ groups: IResponseGroups }>());
export const loadPrivateGroupsFail = createAction('[Groups] Load private groups fail');

export const loadGroup = createAction('[Groups] Load group', props<{ id: number }>());
export const loadGroupSuccess = createAction('[Groups] Load group success', props<{ group: IGroup }>());
export const loadGroupFail = createAction('[Groups] Load group fail');

export const loadGroupsPosts = createAction('[Groups] Load groups posts', props<{ url: string | null; id: number }>());
export const loadGroupsPostsSuccess = createAction('[Groups] Load groups posts success', props<{ posts: IResponsePosts }>());
export const loadGroupsPostsFail = createAction('[Groups] Load groups posts fail');

export const addPost = createAction('[Groups] Add post', props<{ post: FormData; groupId: number; refreshAction: Action }>());
export const addPostSuccess = createAction('[Groups] Add post success');
export const addPostFail = createAction('[Groups] Add post fail');

export const showAddingPostForm = createAction('[Groups] Show adding post form');
export const hideAddingPostForm = createAction('[Groups] Hide adding post form');

export const loadGroupMembers = createAction('[Groups] Load groups members', props<{ groupId: number; url: string | null }>());
export const loadGroupMembersSuccess = createAction('[Groups] Load groups members success', props<{ members: IResponseUsers }>());
export const loadGroupMembersFail = createAction('[Groups] Load groups members fail');

export const makeModerator = createAction('[Groups] Make moderator', props<{ moderatorId: number; groupId: number }>());
export const makeModeratorSuccess = createAction('[Groups] Make moderator success');
export const makeModeratorFail = createAction('[Groups] Make moderator fail');

export const dropMember = createAction('[Groups] Drop member', props<{ memberId: number; groupId: number }>());
export const dropMemberSuccess = createAction('[Groups] Drop member success');
export const dropMemberFail = createAction('[Groups] Drop member fail');

export const loadPendingMembers = createAction('[Groups] Load pending members', props<{ groupId: number; url: string | null }>());
export const loadPendingMembersSuccess = createAction('[Groups] Load pending members success', props<{ pendingMembers: IResponseUsers }>());
export const loadPendingMembersFail = createAction('[Groups] Load pending members fail');

export const acceptPendingMember = createAction('[Groups] Accept pending member', props<{ userId: number; groupId: number }>());
export const acceptPendingMemberSuccess = createAction('[Groups] Accept pending member success');
export const acceptPendingMemberFail = createAction('[Groups] Accept pending member fail');

export const rejectPendingMember = createAction('[Groups] Reject pending member', props<{ userId: number; groupId: number }>());
export const rejectPendingMemberSuccess = createAction('[Groups] Reject pending member success');
export const rejectPendingMemberFail = createAction('[Groups] Reject pending member fail');

export const deleteGroup = createAction('[Groups] Delete group', props<{ groupId: number }>());
export const deleteGroupSuccess = createAction('[Groups] Delete group success');
export const deleteGroupFail = createAction('[Groups] Delete group fail');

export const leaveGroup = createAction('[Groups] Leave group', props<{ groupId: number }>());
export const leaveGroupSuccess = createAction('[Groups] Leave group success');
export const leaveGroupFail = createAction('[Groups] Leave group fail');

export const editGroup = createAction('[Groups] Edit group', props<{ group: FormData; groupId: number; refreshAction: () => void }>());
export const editGroupSuccess = createAction('[Groups] Edit group success');
export const editGroupFail = createAction('[Groups] Edit group fail');

export const searchForGroup = createAction('[Groups] Search for group', props<{ phrase: string; url: string | null }>());
export const searchForGroupSuccess = createAction('[Groups] Search for group success', props<{ results: IResponseGroups }>());
export const searchForGroupFail = createAction('[Groups] Search for group fail');

export const clearResults = createAction('[Groups] Clear results');

export const joinGroup = createAction('[Groups] Join group', props<{ groupId: number }>());
export const joinGroupSuccess = createAction('[Groups] Join group success');
export const joinGroupFail = createAction('[Groups] Join group fail');

export const showGroupCreationForm = createAction('[Groups] Show group creation form');
export const hideGroupCreationForm = createAction('[Groups] Hide group creation form');

export const createGroup = createAction('[Groups] Create group', props<{ groupName: string; onSuccessCallback: () => void }>());
export const createGroupSuccess = createAction('[Groups] Create group success');
export const createGroupFail = createAction('[Groups] Create group fail');
