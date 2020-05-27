import { createReducer, on, Action } from '@ngrx/store';

import { hideNav, showNav, toggleNav } from './main.actions';

export interface MainModuleState {
  main: MainState;
}

export interface MainState {
  navVisible: boolean;
}

export const initialState: MainState = {
  navVisible: false,
};

export const MAIN_REDUCER = createReducer(
  initialState,
  on(showNav, (state) => ({ ...state, navVisible: true })),
  on(hideNav, (state) => ({ ...state, navVisible: false })),
  on(toggleNav, (state) => ({ ...state, navVisible: !state.navVisible })),
);

export function mainReducer(state: MainState | undefined, action: Action) {
  return MAIN_REDUCER(state, action);
}
