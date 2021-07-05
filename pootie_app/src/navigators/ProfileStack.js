import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../components/CustomHeader";
import EditProfile from "../screens/auth/EditProfile";
import Profile from "../screens/auth/Profile";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={"profile"}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title={"প্রোফাইল"} />
          ),
        })}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileEdit"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
