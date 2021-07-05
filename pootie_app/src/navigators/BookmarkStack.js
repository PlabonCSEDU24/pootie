import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/tabs/Home";
import { Text } from "react-native";
import PostDetail from "../screens/nested/PostDetail";
import CustomHeader from "../components/CustomHeader";

import Bookmarks from "../screens/tabs/Bookmarks";
const Stack = createStackNavigator();
const BookmarkStack = () => {
  return (
    <Stack.Navigator initialRouteName={"home"}>
      <Stack.Screen
        name="bookmarks"
        component={Bookmarks}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title={"bookmarks"} />
          ),
        })}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="postDetail"
        component={PostDetail}
      />
    </Stack.Navigator>
  );
};

export default BookmarkStack;
