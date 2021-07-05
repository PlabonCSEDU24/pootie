import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/tabs/Home";
import { Text } from "react-native";
import PostDetail from "../screens/nested/PostDetail";
import CustomHeader from "../components/CustomHeader";
import PostsByCategory from "../screens/nested/PostsByCategory";
const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={"home"}>
      <Stack.Screen
        name="home"
        component={Home}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title={"পু টি"} />
          ),
        })}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="postDetail"
        component={PostDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="postsByCategory"
        component={PostsByCategory}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
