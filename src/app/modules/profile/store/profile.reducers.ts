import { createReducer, on, Action } from '@ngrx/store';

import { IUser } from '../../../interfaces';
import * as profileActions from './profile.actions';

export interface ProfileModuleState {
  profile: ProfileState;
}

export interface ProfileState {
  profileLoading: boolean;
  profileData: IUser;
  profileEditing: boolean;
  threadFetching: boolean;
}

export const initialState: ProfileState = {
  profileData: null,
  profileLoading: false,
  profileEditing: false,
  threadFetching: false,
};

export const PROFILE_REDUCER = createReducer(
  initialState,
  on(profileActions.loadProfileData, (state) => ({ ...state, profileLoading: true })),
  on(profileActions.loadProfileDataSuccess, (state, { user }) => ({ ...state, profileLoading: false, profileData: user })),
  on(profileActions.loadProfileDataFail, (state) => ({ ...state, profileLoading: false })),

  on(profileActions.editProfileData, (state) => ({ ...state, profileEditing: true })),
  on(profileActions.editProfileDataSuccess, (state, { user }) => ({ ...state, profileEditing: false, profileData: user })),
  on(profileActions.editProfileDataFail, (state) => ({ ...state, profileEditing: false })),

  on(profileActions.fetchOrCreateThread, (state) => ({ ...state, threadFetching: true })),
  on(profileActions.fetchOrCreateThreadSuccess, (state) => ({ ...state, threadFetching: false })),
  on(profileActions.fetchOrCreateThreadFail, (state) => ({ ...state, threadFetching: false })),
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return PROFILE_REDUCER(state, action);
}
