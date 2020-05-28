import { createReducer, on, Action } from '@ngrx/store';

import { IResponseUsers } from '@core/interfaces';
import { IGroup } from '@core/interfaces/group.interface';
import * as mainActions from './main.actions';

export interface MainModuleState {
  main: MainState;
}

export interface MainState {
  navVisible: boolean;
  basicGroupsLoading: boolean;
  basicGroups: IGroup[];
  friendsLoading: boolean;
  friends: IResponseUsers;
}

export const initialState: MainState = {
  navVisible: false,
  basicGroupsLoading: false,
  basicGroups: [],
  friendsLoading: false,
  friends: null,
};

export const MAIN_REDUCER = createReducer(
  initialState,
  on(mainActions.showNav, (state) => ({ ...state, navVisible: true })),
  on(mainActions.hideNav, (state) => ({ ...state, navVisible: false })),
  on(mainActions.toggleNav, (state) => ({ ...state, navVisible: !state.navVisible })),

  on(mainActions.loadBaseGroups, (state) => ({ ...state, basicGroupsLoading: true })),
  on(mainActions.loadBaseGroupsSuccess, (state, { baseGroups }) => ({
    ...state,
    basicGroupsLoading: false,
    basicGroups: baseGroups,
  })),
  on(mainActions.loadBaseGroupsFail, (state) => ({ ...state, basicGroupsLoading: false })),

  on(mainActions.loadFriendsList, (state) => ({ ...state, friendsLoading: true })),
  on(mainActions.loadFriendsListSuccess, (state, { users }) => ({
    ...state,
    friendsLoading: false,
    friends: { next: users.next, users: state.friends ? [...state.friends.users, ...users.users] : users.users },
  })),
  on(mainActions.loadFriendsListFail, (state) => ({ ...state, friendsLoading: false })),
);

export function mainReducer(state: MainState | undefined, action: Action) {
  return MAIN_REDUCER(state, action);
}
