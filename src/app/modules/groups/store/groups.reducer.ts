import { IGroup, IResponseGroups } from '@core/interfaces';
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
}

export const initialState: GroupsState = {
  privateGroupsLoading: false,
  privateGroups: null,
  groupLoading: false,
  group: null,
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
);

export function groupsReducer(state: GroupsState | undefined, action: Action) {
  return GROUPS_REDUCER(state, action);
}
