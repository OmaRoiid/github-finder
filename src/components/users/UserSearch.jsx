import { useContext, useState } from "react";
import { AlertContext } from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";
import GithubContext from "../../context/github/GithubContext";

export const UserSearch = () => {
  const [search, setSearch] = useState("");
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search === "") {
      setAlert("Please enter a search term", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(search);
      console.log(users);
      dispatch({ type: "GET_USERS", users: users });
      setSearch("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSearchSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {!!users.length && (
        <div>
          <button
            onClick={() => dispatch({ type: "ClEAR_USERS" })}
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
