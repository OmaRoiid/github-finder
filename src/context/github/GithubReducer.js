export const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.users, loading: false };
    default:
      return state;
  }
};
