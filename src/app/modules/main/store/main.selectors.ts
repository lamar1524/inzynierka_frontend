import { createSelector } from '@ngrx/store';

import { MainModuleState, MainState } from './main.reducer';

export const mainSelector = (state: MainModuleState) => state.main;

export const selectNavVisibility = createSelector(mainSelector, (state: MainState) => state.navVisible);

export const selectBaseGroupsLoading = createSelector(mainSelector, (state: MainState) => state.basicGroupsLoading);
export const selectBaseGroups = createSelector(mainSelector, (state: MainState) => state.basicGroups);

export const selectFriendsLoading = createSelector(mainSelector, (state: MainState) => state.friendsLoading);
export const selectFriends = createSelector(mainSelector, (state: MainState) => state.friends);
