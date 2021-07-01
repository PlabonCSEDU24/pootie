import { createContext } from "react";
export default Context = createContext({
  isLoggedIn: false,
  user: {},
  authToken: "",
  login: () => {},
  logout: () => {},
  setUser: () => {},
});
