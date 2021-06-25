import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Home from "../screens/tabs/Home";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useRef } from "react";
import Login from "../screens/auth/Login";
import TabBarCustomButton from "../components/TabBarCustomButton";
import { COLORS, SIZES } from "../constants";
import ProfileStack from "./ProfileStack";
import HomeStack from "./HomeStack";
import Profile from "../screens/tabs/Profile";
import CreatePost from "../screens/tabs/CreatePost";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: "white",

            bottom: 20,
            marginHorizontal: SIZES.padding,
            height: 60,
            borderRadius: 10,
            position: "absolute",
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        }}
      >
        {
          // Tab Screens....
          // Tab ICons....
        }
        <Tab.Screen
          name={"Home"}
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? COLORS.black : COLORS.lightGray4}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Search"}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="enviromento"
                size={24}
                color={focused ? COLORS.black : COLORS.lightGray4}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        {
          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen
          name={"ActionButton"}
          component={CreatePost}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="post-add" size={24} color={COLORS.white} />
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
          }}
        ></Tab.Screen>

        <Tab.Screen
          name={"Notifications"}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="save"
                size={24}
                color={focused ? COLORS.black : COLORS.lightGray4}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"profile"}
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="user"
                size={24}
                color={focused ? COLORS.black : COLORS.lightGray4}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: COLORS.primary,
          position: "absolute",
          bottom: 79,
          // Horizontal Padding = 20...
          left: 50,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
