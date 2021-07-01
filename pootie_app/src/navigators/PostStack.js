import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../components/CustomHeader";
import CreatePost from "../screens/tabs/CreatePost";
const Stack = createStackNavigator();
const PostStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Post"}>
      <Stack.Screen
        name="Post"
        component={CreatePost}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title={"পোস্ট করুন"} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default PostStack;
