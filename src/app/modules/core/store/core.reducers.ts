import { createReducer, on, Action } from '@ngrx/store';
import * as coreActions from './core.actions';

export interface CoreModuleState {
  core: CoreState;
}

export interface CoreState {
  postDeleting: boolean;
  postEditing: boolean;
}
export const initialState: CoreState = {
  postDeleting: false,
  postEditing: false,
};

export const CORE_REDUCER = createReducer(
  initialState,
  on(coreActions.editPost, (state) => ({ ...state, postEditing: true })),
  on(coreActions.editPostSuccess, (state) => ({ ...state, postEditing: false })),
  on(coreActions.editPostFail, (state) => ({ ...state, postEditing: false })),

  on(coreActions.deletePost, (state) => ({ ...state, postDeleting: true })),
  on(coreActions.deletePostSuccess, (state) => ({ ...state, postDeleting: false })),
  on(coreActions.deletePostFail, (state) => ({ ...state, postDeleting: false })),
);

export function coreReducer(state: CoreState | undefined, action: Action) {
  return CORE_REDUCER(state, action);
}
