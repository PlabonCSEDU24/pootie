import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import Profile from "../screens/tabs/Profile";
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"profile"}
    >
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
