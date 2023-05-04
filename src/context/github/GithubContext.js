import { createContext, useReducer } from "react";
import { githubReducer } from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //Get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      users: items,
    });
  };
  //Get User
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        user: data,
      });
    }
  };
  //Get user repositories
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const { data } = await response.json();
    dispatch({
      type: "GET_USER_REPOS",
      repos: data,
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  const clearUsers = () => dispatch({ type: "ClEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
