export function clearState(reducer) {
  return (state, action) => {
    if (action.type === '[Authorization] Logout user') {
      state = undefined;
    }

    return reducer(state, action);
  };
}
