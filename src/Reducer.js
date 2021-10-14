export const initialState = {
  repoIndex: 0,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        repoIndex: action.repoIndex,
      };
    default:
      return state;
  }
};

export default reducer;
