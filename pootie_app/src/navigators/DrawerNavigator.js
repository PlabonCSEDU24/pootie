import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import AuthStack from "./AuthStack";
import CustomDrawer from "./CustomDrawer";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants";
const Drawer = createDrawerNavigator();
const drawers = [
  {
    name: "HomeTab",
    screen: TabNavigator,
    label: "Home",
    icon: "home",
  },
  {
    name: "Auth",
    screen: AuthStack,
    label: "Login",
    icon: "login",
  },
];
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: COLORS.lightGray4,
        itemStyle: { marginVertical: 3 },
      }}
    >
      {drawers.map(({ name, icon, label, screen }) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={screen}
          options={() => ({
            title: ({ focused }) => (
              <Text
                style={{
                  ...FONTS.body4,
                }}
              >
                {label}
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <AntDesign
                name={icon}
                size={23}
                color={focused ? COLORS.primary : COLORS.lightGray4}
              />
            ),
          })}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
