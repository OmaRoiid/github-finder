export const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.users, loading: false };
    case "GET_USER":
      return { ...state, user: action.user, loading: false };
    case "GET_USER_REPOS":
      return { ...state, user: action.repos, loading: false };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ClEAR_USERS":
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};
