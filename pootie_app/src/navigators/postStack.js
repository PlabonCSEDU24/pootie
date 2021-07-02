import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../components/CustomHeader";
import createPost from "../screens/tabs/CreatePost";
const Stack = createStackNavigator();
const PostStack = () => {
  return (
    <Stack.Navigator initialRouteName={"post"}>
      <Stack.Screen
        name="post"
        component={createPost}
        options={({ navigation }) => ({
          headerTitle: () => (
            <CustomHeader navigation={navigation} title={"পোস্ট করুন"} />
          ),
        })}
      />
      {/*post confirm screen here*/}
    </Stack.Navigator>
  );
};

export default PostStack;
