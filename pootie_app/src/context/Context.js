import { createContext } from "react";
export default Context = createContext({
  isLoggedIn: false,
  user: {},
  authToken: "",
  posts: [],
  login: () => {},
  logout: () => {},
  setUser: () => {},
  setAuthToken: () => {},
  setPosts: () => {},
});
