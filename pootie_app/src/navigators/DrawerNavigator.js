import React, { useContext } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import AuthStack from "./AuthStack";
import CustomDrawer from "./CustomDrawer";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants";
import Context from "../context/Context";
const Drawer = createDrawerNavigator();

//drawer items to show when logged out
const drawers = [
  {
    name: "HomeTab",
    screen: TabNavigator,
    label: "Home",
    icon: "home",
  },
];
//drawer items to show when logged in
const drawers_authorised = [
  drawers[0],
  {
    name: "Auth",
    screen: AuthStack,
    label: "Login",
    icon: "login",
  },
];
//indexing drawers to render
const render = [drawers, drawers_authorised];

const DrawerNavigator = () => {
  const { isLoggedIn, logout } = useContext(Context);
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} logout={logout} isLoggedIn={isLoggedIn} />
      )}
      drawerContentOptions={{
        activeTintColor: COLORS.lightGray4,
        itemStyle: { marginVertical: 3 },
      }}
    >
      {render[isLoggedIn ? 0 : 1].map(({ name, icon, label, screen }) => (
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
                size={24}
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
