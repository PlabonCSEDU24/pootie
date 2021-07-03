import React, { useRef, useContext } from "react";
import { Animated, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Home from "../screens/tabs/Home";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import TabBarCustomButton from "../components/TabBarCustomButton";
import { COLORS, SIZES } from "../constants";
import HomeStack from "./HomeStack";
import Profile from "../screens/tabs/Profile";
import Context from "../context/Context";
import AuthStack from "./AuthStack";
import PostStack from "./postStack";
import EditProfile from "../screens/nested/EditProfile";
import CreatePost from "../screens/tabs/CreatePost";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { isLoggedIn } = useContext(Context);
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: styles.tab,
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
          name={"Nearby"}
          component={EditProfile}
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
          component={isLoggedIn ? PostStack : AuthStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="post-add" size={24} color={COLORS.white} />
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Notifications"}
          component={CreatePost}
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
  let width = SIZES.width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "white",
    bottom: 20,
    marginHorizontal: SIZES.padding,
    height: 60,
    borderRadius: 10,
    position: "absolute",
    paddingHorizontal: 20,
  },
});
