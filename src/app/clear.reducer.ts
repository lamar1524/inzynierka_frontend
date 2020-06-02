import { logoutUser } from '@authorization/store';

export function clearState(reducer) {
  return (state, action) => {
    if (action.type === logoutUser.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
