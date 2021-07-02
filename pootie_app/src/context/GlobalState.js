import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./Context";
const GlobalState = ({ children }) => {
  //global states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [authToken, setAuthToken] = useState("");
  //functions
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    removeStoredItems();
    setUser({});
    setAuthToken("");
  };

  //auto login if there is a token stored
  const autoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const user = await AsyncStorage.getItem("auth_user");
      if (token !== null && user !== null) {
        setAuthToken(token);
        setUser(JSON.parse(user));
        login();
      } else {
        logout();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    autoLogin();
  }, []);

  //remove stored items
  const removeStoredItems = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("auth_user");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Context.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        authToken: authToken,
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
