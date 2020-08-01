import { createSelector } from '@ngrx/store';

import { ProfileModuleState, ProfileState } from './profile.reducers';

export const profileState = (state: ProfileModuleState) => state.profile;

export const selectProfileLoading = createSelector(profileState, (state: ProfileState) => state.profileLoading);
export const selectProfileData = createSelector(profileState, (state: ProfileState) => state.profileData);

export const selectProfileEditing = createSelector(profileState, (state: ProfileState) => state.profileEditing);
