import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./Context";
import { BACKEND_URL } from "../constants/config";
import { useHttpClient } from "../uitls/http-hook";
const GlobalState = ({ children }) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  //global states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [authToken, setAuthToken] = useState("");
  const [posts, setPosts] = useState([]);

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
      alert(error);
    }
  };

  //fetch recent posts
  const fetchPosts = async () => {
    try {
      const responseData = await sendRequest(
        BACKEND_URL + "/api/posts/?limit=20"
      );
      if (responseData) {
        setPosts(responseData);
      }
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    autoLogin();
    fetchPosts();
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
        posts: posts,
        login: login,
        logout: logout,
        setUser: setUser,
        setAuthToken: setAuthToken,
        setPosts: setPosts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default GlobalState;
