import React, { useState } from "react";
import Context from "./Context";
const GlobalState = ({ children }) => {
  //global states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  //functions
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        login: login,
        logout: logout,
        setUser: setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default GlobalState;
