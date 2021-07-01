import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Home from "../screens/tabs/Home";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Login from "../screens/auth/Login";
import TabBarCustomButton from "../components/TabBarCustomButton";
import { COLORS, SIZES } from "../constants";
import HomeStack from "./HomeStack";
import Profile from "../screens/tabs/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
          component={Login}
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
