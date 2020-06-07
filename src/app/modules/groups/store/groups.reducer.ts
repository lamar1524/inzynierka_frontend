import { IGroup, IResponseGroups, IResponsePosts, IResponseUsers } from '@core/interfaces';
import { IUser } from '@core/interfaces/user.interface';
import { createReducer, on, Action } from '@ngrx/store';

import * as groupsActions from './groups.actions';

export interface GroupsModuleState {
  groups: GroupsState;
}

export interface GroupsState {
  privateGroupsLoading: boolean;
  privateGroups: IResponseGroups;
  groupLoading: boolean;
  group: IGroup;
  groupsPostsLoading: boolean;
  groupsPosts: IResponsePosts;
  postAdding: boolean;
  addingPostFormVisibility: boolean;
  membersLoading: boolean;
  members: IResponseUsers;
  makingModerator: boolean;
}

export const initialState: GroupsState = {
  privateGroupsLoading: false,
  privateGroups: null,
  groupLoading: false,
  group: null,
  groupsPostsLoading: false,
  groupsPosts: null,
  postAdding: false,
  addingPostFormVisibility: false,
  membersLoading: false,
  members: null,
  makingModerator: false,
};

export const GROUPS_REDUCER = createReducer(
  initialState,
  on(groupsActions.loadPrivateGroups, (state) => ({ ...state, privateGroupsLoading: true })),
  on(groupsActions.loadPrivateGroupsSuccess, (state, { groups }) => ({
    ...state,
    privateGroupsLoading: false,
    privateGroups: groups.previous
      ? { next: groups.next, previous: groups.previous, groups: [...state.privateGroups.groups, ...groups.groups] }
      : groups,
  })),
  on(groupsActions.loadPrivateGroupsFail, (state) => ({ ...state, privateGroupsLoading: false })),

  on(groupsActions.loadGroup, (state) => ({ ...state, groupLoading: true })),
  on(groupsActions.loadGroupSuccess, (state, { group }) => ({ ...state, groupLoading: false, group })),
  on(groupsActions.loadGroupFail, (state) => ({ ...state, groupLoading: false })),

  on(groupsActions.loadGroupsPosts, (state, { url }) => ({
    ...state,
    groupsPostsLoading: true,
    groupsPosts: url ? state.groupsPosts : null,
  })),
  on(groupsActions.loadGroupsPostsSuccess, (state, { posts }) => ({
    ...state,
    groupsPostsLoading: false,
    groupsPosts: posts.previous
      ? { next: posts.next, previous: posts.previous, posts: [...state.groupsPosts.posts, ...posts.posts] }
      : posts,
  })),
  on(groupsActions.loadGroupsPostsFail, (state) => ({ ...state, groupsPostsLoading: false })),

  on(groupsActions.addPost, (state) => ({ ...state, postAdding: true })),
  on(groupsActions.addPostSuccess, (state) => ({ ...state, postAdding: false })),
  on(groupsActions.addPostFail, (state) => ({ ...state, postAdding: false })),

  on(groupsActions.showAddingPostForm, (state) => ({ ...state, addingPostFormVisibility: true })),
  on(groupsActions.hideAddingPostForm, (state) => ({ ...state, addingPostFormVisibility: false })),

  on(groupsActions.loadGroupMembers, (state) => ({ ...state, membersLoading: true })),
  on(groupsActions.loadGroupMembersSuccess, (state, { members }) => ({
    ...state,
    membersLoading: false,
    members: members.previous ? { next: members.next, previous: members.previous, members: members.users } : members,
  })),
  on(groupsActions.loadGroupMembersFail, (state) => ({ ...state, membersLoading: false })),

  on(groupsActions.makeModerator, (state) => ({ ...state, makingModerator: true })),
  on(groupsActions.makeModeratorSuccess, (state) => ({ ...state, makingModerator: false })),
  on(groupsActions.makeModeratorFail, (state) => ({ ...state, makingModerator: false })),
);

export function groupsReducer(state: GroupsState | undefined, action: Action) {
  return GROUPS_REDUCER(state, action);
}
