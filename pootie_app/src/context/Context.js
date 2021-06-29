import { createContext } from "react";
export default Context = createContext({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logout: () => {},
  setUser: () => {},
});
